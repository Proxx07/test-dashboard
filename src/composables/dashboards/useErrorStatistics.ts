import $axios from "@/api/axios.ts";

import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, ref, watch} from "vue";

import {useFilter} from "@/composables/useFilter.ts";
import {useAbortController} from "@/composables/useAbortController.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

export const useErrorsStatistic = () => {
  const {dateInterval, projectID} = useFilter();
  const {signal} = useAbortController();

  const list = ref<IErrorItem[]>([])
  const isFetching = ref<boolean>(false)

  const filter = computed<IFilter>(() => {
    return {
      fromDate: dateInterval.value[0],
      toDate: dateInterval.value[1],
      projectId: projectID.value,
    }
  });

  const sortedList = computed<IErrorItem[]>(() => {
    return [...list.value].sort((a: IErrorItem, b: IErrorItem) => a.count - b.count)
  });

  const dataForChart = computed<seriesType[]>(()  => {
    const sortedArray = [...sortedList.value].reverse()
    const topErrors = sortedArray.slice(0, 5).map(i => ({name: i.type, data: i.count}));

    const sumOfRemaining = sortedArray.slice(5).reduce((acc, current) => {
      return acc + current.count
    }, 0);

    const remain: seriesType = {
      name: "OTHER_ERRORS",
      data: sumOfRemaining
    }

    return sortedArray.length > 5 ? [...topErrors, remain] : [...topErrors]
  });

  const series = computed(() => dataForChart.value.map(i => i.data as number))
  const categories = computed(() => dataForChart.value.map(i => i.name))

  const fetchData = async (query?: IFilter) => {
    isFetching.value = true
    await new Promise(resolve => setTimeout(resolve, 7000))
    try {
      const {data: {result}} = await $axios.post<IResponse<IErrorItem[]>>('/statistic/by_check', query ?? filter?.value, {signal})
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
    await filterHandler()
  });

  return {
    dateInterval,
    sortedList,
    isFetching,

    series,
    dataForChart,
    categories,

    filter,
    fetchData,
    filterHandler,
  }
}