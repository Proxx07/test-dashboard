import {AxiosResponse} from "axios";
import {onMounted, ref, computed} from "vue";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import $axios from "@/api/axios.ts";

export const useErrorsStatistic = () => {
  const list = ref<IErrorItem[]>([]);
  const isFetching = ref<boolean>(false)
  const filter = ref<IFilter>({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: null
  });

  const sortedList = computed(() => {
    return list.value.sort((a: IErrorItem, b: IErrorItem) => a.count - b.count)
  });

  const fetchData = async () => {
    isFetching.value = true

    try {
      const {data: {result}}: AxiosResponse<IResponse<IErrorItem[]>> = await $axios.post('/statistic/by_check', filter.value)
      list.value = result
    }

    finally {
      isFetching.value = false
    }
  }
  const filterHandler = async () => {
    await fetchData()
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