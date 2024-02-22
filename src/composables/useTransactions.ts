import $axios from "@/api/axios.ts";

import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IStatistic} from "@/models/interfaces/mainPageInterfaces.ts";
import {transationsStatisticThead} from "@/models/staticContent/mainPageContent.ts";

import {computed, ref, watch} from "vue";

import {checkUserAccess} from "@/utils/roles.ts";
import {useFilter} from "@/composables/useFilter.ts";
import {useAbortController} from "@/composables/useAbortController.ts";


export const useTransactions = ()=> {
  const {dateInterval, projectID} = useFilter();
  const {signal} = useAbortController();

  const list = ref<IStatistic[]>([]);
  const isFetching = ref<boolean>(false);

  const filter = computed(() => {
    return {
      fromDate: dateInterval.value[0],
      toDate: dateInterval.value[1],
      projectId: projectID.value,
    }
  });

  const tableHeaders = transationsStatisticThead.filter(header => {
    return header?.access && checkUserAccess(header?.access) || !header?.access
  });

  const fetchData = async () => {
    isFetching.value = true

    try {
      const {data: {result}} = await $axios.post<IResponse<IStatistic>>('/statistic/by_date', filter.value, {signal})
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
    await filterHandler()
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