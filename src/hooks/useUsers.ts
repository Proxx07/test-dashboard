import {computed, onMounted, ref} from "vue";
import request from "@/api/axios.ts";
import {IUser, IUserFilter, IUserWithDate, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {declination, getDateInterval} from "@/utils/scripts.ts";
import {useRouter} from "vue-router";
import {accesses, checkUserAccess} from "@/utils/roles.ts";
import {useToast} from "@/hooks/useToast.ts";

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
    const res = await request.get<IResponse<IListResponse<IUser[]>>>('/users', filter.value)
    isFetching.value = false
    usersCount.value = res.result.count
    list.value = res.result.result
  };

  const listItemHandler = (value: IUserWithDate) => {
    if (!checkUserAccess(accesses.UPDATE_USER)) {
      $toast.error('У вас не достаточно прав для перехода на страницу')
    }
    else {
      $router.push({name: "user-edit", params: {id: value.id}})
    }
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

export const useUser = (id: string) => {
  const $router = useRouter()

  const setUser = (user: IUserWithDate | void): IUserWithPassword => {
    return {
      name: user?.name || "",
      phone: user?.phone || "998",
      email: user?.email || "",
      projectId: user?.projectId || "",
      role : user ? user.role : null,
      password: ""
    }
  }

  const user = ref<IUserWithPassword>(setUser())
  const buttonText = computed(() => !id ? "Cоздать" : "Редактировать")

  const getUser = async () => {
    if (!id) return
    const {result} = await request.get<IResponse<IUserWithDate>>(`/users/${id}`)
    user.value = setUser(result)
  }
  const postUser = async () => {
    user.value.phone = user.value.phone.replace(/[^+\d]/g, '').substring(1);
    const result = await request.post<IResponse<IUserWithDate>>('/users', user.value)
    if (result.statusCode === 200 || result.statusCode === 201) {
      await $router.push({name: "users"})
      $toast.success("Пользователь создан")
    } else {
      $toast.error("Что-то пошло не так")
    }
  }
  
  const putUser = async () => {
    user.value.phone = user.value.phone.replace(/[^+\d]/g, '').substring(1);
    const result = await request.put<IResponse<IUserWithDate>>(`/users/${id}`, user.value)
    if (result.statusCode === 200 || result.statusCode === 201) {
      await $router.push({name: "users"})
      $toast.success("Пользователь обновлён")
    } else {
      $toast.error("Что-то пошло не так")
    }
  }
  const deleteUser = async () => {
    if (!confirm('Вы действительно хотите удалить пользователя?')) return
    const result = await request.delete<IResponse<IUserWithDate>>(`/users/${id}`)
    if (result.statusCode === 200 || result.statusCode === 201) {
      await $router.push({name: "users"})
      $toast.success("Пользователь удалён")
    } else {
      $toast.error("Что-то пошло не так")
    }
  }

  const submitForm = () => {
    if (id) {
      putUser()
    } else {
      postUser()
    }
  }

  onMounted(() => {
    getUser()
  })

  return {
    user,
    buttonText,

    getUser,
    postUser,
    putUser,
    deleteUser,
    submitForm,
  }
}