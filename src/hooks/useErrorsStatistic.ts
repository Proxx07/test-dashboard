import {onMounted, ref} from "vue";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import request from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";


export const useErrorsStatistic = () => {
  const list = ref([]);
  const isFetching = ref<boolean>(false)
  const filter = ref<IFilter>({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: null
  });

  const fetchData = async () => {
    isFetching.value = true
    const res = await request.post<IResponse<IErrorItem[]>>('/statistic/by_check', filter.value)
    isFetching.value = false

    list.value = res.result
  };
  const filterHandler = () => {
    fetchData()
  };
  const pageHandler = (page: string | number) => {
    console.log(page)
  };
  onMounted(() => {
    fetchData()
  });

  return {
    list,
    isFetching,
    filter,
    fetchData,
    filterHandler,
    pageHandler
  }
}