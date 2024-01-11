import $axios from "@/api/axios.ts";

import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {AxiosResponse} from "axios";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, onMounted, ref, watch} from "vue";

import {getDateInterval} from "@/utils/scripts.ts";
import {useProjectsStore} from "@/stores";

export const useErrorsStatistic = () => {
  const projectStore = useProjectsStore();

  const list = ref<IErrorItem[]>([]);
  const isFetching = ref<boolean>(false)

  const filter = computed<IFilter>(() => ({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: projectStore.activeProject
  }));

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


  watch(() => projectStore.activeProject,  async () => {
    await fetchData()
  })

  onMounted(() => {
    fetchData()
  });

  return {
    filter,
    sortedList,
    isFetching,
    fetchData,
    filterHandler,
  }
}