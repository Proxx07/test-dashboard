import $axios from "@/api/axios.ts";

import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IStatistic} from "@/models/interfaces/mainPageInterfaces.ts";
import {transationsStatisticThead} from "@/models/staticContent/mainPageContent.ts";

import { onMounted, ref, watch } from "vue";

import {checkUserAccess} from "@/utils/roles.ts";
import {useFilter} from "@/hooks/useFilter.ts";


export const useTransactions = ()=> {
  const {filter, dateInterval} = useFilter();

  const list = ref<IStatistic[]>([]);
  const isFetching = ref<boolean>(false)

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

  watch(() => filter.value.projectId, async () => {
    await fetchData()
  })

  onMounted(() => {
    fetchData()
  });

  return {
    list,
    isFetching,
    tableHeaders,

    dateInterval,

    fetchData,
    filterHandler,
  }
}