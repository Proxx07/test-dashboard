import $axios from "@/api/axios.ts";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {AxiosError} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";

import {$confirm} from "@/plugins/ConfirmationPlugin.ts";
import {useToast} from "@/hooks/useToast.ts";
export const useUser = () => {
  const $router = useRouter();
  const $toast = useToast();

  const setUser = (user?: IUser): IUserWithPassword => {
    return {
      ...(user?.id && { id: user.id }),
      name: user?.name || "",
      phone: user?.phone || "998",
      email: user?.email || "",
      projectId: user?.projectId || "",
      role: user ? user.role : null,
      password: ""
    }
  };

  const user = ref<IUserWithPassword>(setUser());
  const buttonText = computed(() => !user.value.id ? "Cоздать" : "Редактировать");

  const getUser = async (id: string = $router.currentRoute.value.params.id as string) => {
    if (!id) return
    try {
      const {data: {result}} = await $axios.get<IResponse<IUser>>(`/users/${id}`)
      user.value = setUser(result)
    }
    catch (e) {
      console.log(e)
    }
  }

  const postUser = async () => {
    user.value.phone = user.value.phone.replace(/[^+\d]/g, '').substring(1)

    try {
      await $axios.post('/users', user.value)
      await $router.push({name: "users"})
      $toast.success("Пользователь создан")
    }
    catch (e) {
      const err = e as AxiosError<{message: string[] | string}>
      const errorText = err.response?.data.message
      $toast.error(Array.isArray(errorText) ? errorText.join('\n') : errorText)
    }
  }

  const putUser = async () => {
    user.value.phone = user.value.phone.replace(/[^+\d]/g, '').substring(1);

    try {
      await $axios.put(`/users/${user.value.id}`, user.value)
      await $router.push({name: "users"})
      $toast.success("Пользователь обновлён")
    }
    catch (e) {
      const err = e as AxiosError<{message: string[]}>
      const errorText = err.response?.data.message
      $toast.error(Array.isArray(errorText) ? errorText.join('\n') : errorText)
    }
  }

  const deleteUser = async () => {
    const ok = await $confirm('Удаление пользователя!', 'Вы действительно хотите удалить пользователя?')
    if (!ok) return

    try {
      await $axios.delete(`/users/${user.value.id}`)
      await $router.push({name: "users"})
      $toast.success("Пользователь удалён")
    }
    catch (e) {
      const err = e as AxiosError<{message: string}>
      const errorText = err.response?.data.message
      $toast.error(errorText)
    }
  }

  const submitForm = async () => {
    if (user.value.id) {
      await putUser()
    } else {
      await postUser()
    }
  }

  onMounted(() => {
    getUser()
  });

  return {
    user,
    buttonText,
    setUser,

    getUser,
    postUser,
    putUser,

    deleteUser,
    submitForm,
  }
}