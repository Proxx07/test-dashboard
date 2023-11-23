import {onMounted, ref, computed} from "vue";
import request from "@/api/axios.ts";
import {IUser, IUserFilter} from "@/models/interfaces/usersInterfaces.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {declination, getDateInterval} from "@/utils/scripts.ts";

export const useUsers = () => {

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
  }
}