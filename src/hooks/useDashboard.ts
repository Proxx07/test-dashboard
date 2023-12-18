import {ref} from "vue";
import {IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";

export const useDashboard = () => {
  const filter = ref<IFilter>({
    fromDate: getDateInterval(1)[0],
    toDate: getDateInterval(0)[1],
    projectId: null
  });

  const filterHandler = () => {
    console.log(filter.value)
  }

  return {
    filter,

    filterHandler
  }
}