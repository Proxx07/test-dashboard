import $axios from "@/api/axios.ts";
import {AxiosError} from "axios";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";

import {computed, onMounted, ref} from "vue";
import {$confirm} from "@/plugins/ConfirmationPlugin.ts";

import {useRouter} from "vue-router";
import {useToast} from "@/hooks/useToast.ts";
import {useFilter} from "@/hooks/useFilter.ts";

const $toast = useToast()

export const useUsers = () => {
  const $router = useRouter();
  const {filter, page, dateInterval} = useFilter();

  const list = ref<IUser[]>([]);
  const isFetching = ref<boolean>(false);
  const totalPages = ref<number>(1);

  const usersCount = ref<number>(0);

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}} = await $axios.get<IResponse<IListResponse<IUser[]>>>('/users', {params: filter.value})
      list.value = result.result
      usersCount.value = result.count
    }
    finally {
      isFetching.value = false
    }
  };

  const listItemHandler = async (value: IUser) => {
    await $router.push({name: "user-edit", params: {id: value.id}})
  }

  onMounted(() => {
    fetchData()
  });

  return {
    list,
    isFetching,

    dateInterval,
    page,
    totalPages,
    fetchData,
    listItemHandler,
  }
}

export const useUser = (userID: string | void) => {
  const $router = useRouter();

  const setUser = (user: IUser | void): IUserWithPassword => {
    return {
      name: user?.name || "",
      phone: user?.phone || "998",
      email: user?.email || "",
      projectId: user?.projectId || "",
      role: user ? user.role : null,
      password: ""
    }
  };

  const user = ref<IUserWithPassword>(setUser());
  const buttonText = computed(() => !userID ? "Cоздать" : "Редактировать");

  const getUser = async () => {
    if (!userID) return
    try {
      const {data: {result}} = await $axios.get<IResponse<IUser>>(`/users/${userID}`)
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
      await $axios.put(`/users/${userID}`, user.value)
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
      await $axios.delete(`/users/${userID}`)
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
    if (userID) {
      await putUser()
    } else {
      await postUser()
    }
  }

  onMounted(() => {
    getUser()
  })

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