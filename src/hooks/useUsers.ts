import {computed, onMounted, ref} from "vue";
import {IUser, IUserFilter, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {declination, getDateInterval} from "@/utils/scripts.ts";
import {useRouter} from "vue-router";
import {useToast} from "@/hooks/useToast.ts";
import {AxiosError, AxiosResponse} from "axios";
import $axios from "@/api/axios.ts";

const $toast = useToast()

export const useUsers = () => {
  const $router = useRouter()

  const list = ref<IUser[]>([]);
  const isFetching = ref<boolean>(false);
  const totalPages = ref<number>(1);

  const usersCount = ref<number>(0);
  const headerSubtitle = computed(() => {
    return usersCount.value
      ? `( ${usersCount.value} ${declination(usersCount.value, ['пользователь', 'пользователя', 'пользователей'])} )`
      : ""
  });

  const filter = ref<IUserFilter>({
    page: "1",
    search: "",
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(1)[1],
  });

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}}: AxiosResponse<IResponse<IListResponse<IUser[]>>> = await $axios.get('/users', {params: filter.value})
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
    filter,
    headerSubtitle,
    totalPages,
    fetchData,
    listItemHandler,
  }
}

export const useUser = (id: string | void) => {
  const $router = useRouter()

  const setUser = (user: IUser | void): IUserWithPassword => {
    return {
      name: user?.name || "",
      phone: user?.phone || "998",
      email: user?.email || "",
      projectId: user?.projectId || "",
      role: user ? user.role : null,
      password: ""
    }
  }

  const user = ref<IUserWithPassword>(setUser())
  const buttonText = computed(() => !id ? "Cоздать" : "Редактировать")

  const getUser = async () => {
    if (!id) return
    try {
      const {data: {result}}: AxiosResponse<IResponse<IUser>> = await $axios.get(`/users/${id}`)
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
      await $axios.put(`/users/${id}`, user.value)
      await $router.push({name: "users"})
      $toast.success("Пользователь обновлён")
    }
    catch (e) {
      const err = e as AxiosError<{message: string[]}>
      $toast.error(err.response?.data.message.join('\n'))
    }
  }

  const deleteUser = async () => {
    if (!confirm('Вы действительно хотите удалить пользователя?')) return

    try {
      await $axios.delete(`/users/${id}`)
      await $router.push({name: "users"})
      $toast.success("Пользователь удалён")
    }
    catch (e) {
      const err = e as AxiosError<{message: string[]}>
      $toast.error(err.response?.data.message.join('\n'))
    }

  }

  const submitForm = async () => {
    if (id) {
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