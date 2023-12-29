import {AxiosResponse} from "axios";
import {computed, onMounted, ref} from "vue";
import {IErrorItem, IFilter, IStatistic} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import $axios from "@/api/axios.ts";

export const useErrorsStatistic = () => {
  const list = ref<IErrorItem[]>([]);
  const statisticInformation = ref<IStatistic[]>([])

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

  const fetchDataByDate = async () => {
    isFetching.value = true
    try {
      const {data: {result}}: AxiosResponse<IResponse<IStatistic>> = await $axios.post('/statistic/by_date', filter.value)
      statisticInformation.value = [result]
    }
    finally {
      isFetching.value = false
    }
  }
  const filterHandler = async () => {
    await fetchData()
    await fetchDataByDate()
  };

  onMounted(() => {
    fetchData()
  });

  return {
    sortedList,
    isFetching,
    filter,
    statisticInformation,
    fetchData,
    filterHandler,
    fetchDataByDate
  }
}