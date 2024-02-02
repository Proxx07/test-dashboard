import $axios from "@/api/axios.ts";

import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IErrorItem} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, ref, watch} from "vue";

import {useFilter} from "@/hooks/useFilter.ts";
import {useAbortController} from "@/hooks/useAbortController.ts";

export const useErrorsStatistic = () => {
  const {filter, dateInterval} = useFilter();
  const {signal} = useAbortController();

  const list = ref<IErrorItem[]>([])
  const isFetching = ref<boolean>(false)

  const sortedList = computed<IErrorItem[]>(() => {
    return [...list.value].sort((a: IErrorItem, b: IErrorItem) => a.count - b.count)
  });

  const dataForChart = computed<IErrorItem[]>(()  => {
    const sortedArray = [...list.value].sort((a: IErrorItem, b: IErrorItem) => b.count - a.count)
    const topErrors = sortedArray.slice(0, 5)

    const sumOfRemaining = sortedArray.slice(5).reduce((acc, current) => {
      return acc + current.count
    }, 0);

    const remain: IErrorItem = {
      type: "OTHER_ERRORS",
      count: sumOfRemaining
    }

    return sortedArray.length > 5 ? [...topErrors, remain] : [...topErrors]
  })

  const series = computed(() => dataForChart.value.map(({count}) => count));
  const categories = computed(() => dataForChart.value.map(({type}) => type));

  const fetchData = async () => {
    isFetching.value = true
    list.value = []
    try {
      const {data: {result}} = await $axios.post<IResponse<IErrorItem[]>>('/statistic/by_check', filter.value, {signal})
      list.value = result
    }
    finally {
      isFetching.value = false
    }
  }

  const filterHandler = async () => {
    await fetchData()
  };

  watch(() => filter.value.projectId,  async () => {
    await fetchData()
  });

  return {
    dateInterval,
    sortedList,
    isFetching,

    series,
    categories,

    fetchData,
    filterHandler,
  }
}