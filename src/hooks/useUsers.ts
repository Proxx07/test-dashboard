import $axios from "@/api/axios.ts";
import {AxiosError} from "axios";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";
import {IFilter} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, onMounted, ref} from "vue";
import {$confirm} from "@/plugins/ConfirmationPlugin.ts";

import {useRouter} from "vue-router";
import {useToast} from "@/hooks/useToast.ts";
import {useFilter} from "@/hooks/useFilter.ts";

const $toast = useToast()

export const useUsers = () => {
  const $router = useRouter();
  const {page, search} = useFilter();

  const list = ref<IUser[]>([]);
  const isLoadMore = ref<boolean>(true);

  const filter = computed<IFilter>(() => {
    return {
      page: page.value,
      search: search.value,
    }
  });

  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const {data: {result}} = await $axios.get<IResponse<IListResponse<IUser[]>>>('/users', {params: filter.value})

      list.value = Array.isArray(result.result) ? [...list.value, ...result.result] : [...list.value]
      isLoadMore.value = list.value.length < result.count
      page.value += 1

    } catch (_) {
      $toast.error('Что-то пошло не так')
      isLoadMore.value = false
    }
  };

  const listItemHandler = async (value: IUser) => {
    await $router.push({name: "user-edit", params: {id: value.id}})
  }

  return {
    list,
    isLoadMore,

    fetchData,
    listItemHandler,
  }
}

export const useUser = () => {
  const $router = useRouter();
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