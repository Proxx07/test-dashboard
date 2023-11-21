import {onMounted, ref, computed} from "vue";
import request from "@/api/axios.ts";
import {IUser, IUserFilter} from "@/models/interfaces/usersInterfaces.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {LocationQueryValue, useRouter} from "vue-router";
import {declination, getDateInterval} from "@/utils/scripts.ts";

export const useUsers = () => {
  const router = useRouter();

  const list = ref([]);
  const isFetching = ref<boolean>(false);
  const totalPages = ref<number>(1);

  const usersCount = ref<number>(0);
  const headerSubtitle = computed(() => {
    return `( ${usersCount.value} ${declination(usersCount.value, ['пользователь', 'пользователя', 'пользователей'])} )`
  });

  const filter = ref<IUserFilter>({
    page: router.currentRoute.value.query?.page as LocationQueryValue,
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