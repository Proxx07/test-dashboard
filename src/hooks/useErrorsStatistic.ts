import $axios from "@/api/axios.ts";

import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IErrorItem} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, onMounted, ref, watch} from "vue";

import {useFilter} from "@/hooks/useFilter.ts";

export const useErrorsStatistic = () => {
  const {filter, dateInterval} = useFilter();

  const list = ref<IErrorItem[]>([])
  const isFetching = ref<boolean>(false)

  const sortedList = computed(() => {
    return list.value.sort((a: IErrorItem, b: IErrorItem) => a.count - b.count)
  });

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}} = await $axios.post<IResponse<IErrorItem[]>>('/statistic/by_check', filter.value)
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
  })

  onMounted(() => {
    fetchData()
  });

  return {
    dateInterval,
    sortedList,
    isFetching,

    fetchData,
    filterHandler,
  }
}