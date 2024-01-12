import $axios from "@/api/axios.ts";

import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IFilter, IStatistic} from "@/models/interfaces/mainPageInterfaces.ts";
import {transationsStatisticThead} from "@/models/staticContent/mainPageContent.ts";

import {computed, onMounted, ref, watch} from "vue";

import {getDateInterval} from "@/utils/scripts.ts";
import {checkUserAccess} from "@/utils/roles.ts";

import {useProjectsStore} from "@/stores";

export const useTransactions = ()=> {
  const projectStore = useProjectsStore();

  const list = ref<IStatistic[]>([]);
  const isFetching = ref<boolean>(false)

  const filter = computed<IFilter>(() => ({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: projectStore.activeProject
  }));

  const tableHeaders = transationsStatisticThead.filter(header => {
    return header?.access && checkUserAccess(header?.access) || !header?.access
  });

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}}: AxiosResponse<IResponse<IStatistic>> = await $axios.post('/statistic/by_date', filter.value)
      list.value = [result]
    }
    finally {
      isFetching.value = false
    }
  }

  const filterHandler = async () => {
    await fetchData()
  };

  watch(() => projectStore.activeProject, async () => {
    await fetchData()
  })

  onMounted(() => {
    fetchData()
  });

  return {
    list,
    filter,
    isFetching,
    tableHeaders,
    fetchData,
    filterHandler,
  }
}