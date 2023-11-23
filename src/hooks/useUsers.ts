import {onMounted, ref, computed} from "vue";
import request from "@/api/axios.ts";
import {IUser, IUserFilter, IUserWithDate, IUserWithPassword} from "@/models/interfaces/usersInterfaces.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {declination, getDateInterval} from "@/utils/scripts.ts";
import {useRouter} from "vue-router";

export const useUsers = () => {
  const $router = useRouter()

  const list = ref([]);
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
    list.value = Array.isArray(res.result.result) ? res.result.result : []
  };

  const listItemHandler = (value: IUserWithDate) => {
    $router.push({name: "user", params: {id: value.id}})
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

  const setUser = (user: IUserWithDate | void): IUserWithPassword => {
    return {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      projectId: user?.projectId || "",
      role : user ? user.role : null,
      password: ""
    }
  }

  const user = ref<IUser>(setUser())

  const getUser = async (userID: string = id) => {
    const {result} = await request.get<IResponse<IUserWithDate>>(`/users/${userID}`)

    user.value = setUser(result)
  }
  const postUser = async () => {
    const result = await request.post<IResponse<IUserWithDate>>('/users', user.value)
    console.log(result)
  }
  
  const putUser = async (userID: string = id) => {
    const result = await request.put<IResponse<IUserWithDate>>(`/users/${userID}`, user.value)
    console.log(result)
  }
  const deleteUser = async (userID: string = id) => {
    const result = await request.delete<IResponse<IUserWithDate>>(`/users/${userID}`)
    console.log(result)
  }

  onMounted(() => {
    getUser()
  })

  return {
    user,

    getUser,
    postUser,
    putUser,
    deleteUser,
  }
}