import {onMounted, ref, computed} from "vue";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import request from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";

export const useErrorsStatistic = () => {
  const list = ref<IErrorItem[]>([]);
  const isFetching = ref<boolean>(false)
  const filter = ref<IFilter>({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: null
  });

  const sortedList = computed(() => list.value.sort((a: IErrorItem, b: IErrorItem) => {
    return a.count - b.count
  }));

  const fetchData = async () => {
    isFetching.value = true
    try {
      const res = await request.post<IResponse<IErrorItem[]>>('/statistic/by_check', filter.value)
      isFetching.value = false

      list.value = Array.isArray(res.result) ? res.result : []
    }
    catch (error) {

    }
  };
  const filterHandler = () => {

    fetchData()
  };

  onMounted(() => {
    fetchData()
  });

  return {
    sortedList,
    isFetching,
    filter,
    fetchData,
    filterHandler
  }
}