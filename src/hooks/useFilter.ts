import {IFilter} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, ref} from "vue";

import {getDateInterval} from "@/utils/scripts.ts";

import {useProjectsStore} from "@/stores";

export const useFilter = () => {
  const projectStore = useProjectsStore();

  const page = ref<number>(1)
  const search = ref<string>("")
  const dateInterval = ref<[string, string]>([getDateInterval(1)[0], getDateInterval(0)[1]])

  const filter = computed<IFilter>(() => ({
    page: page.value,
    fromDate: dateInterval.value[0],
    toDate: dateInterval.value[1],
    projectId: projectStore.activeProject,
  }));

  return {
    page,
    search,
    dateInterval,

    filter,
  }
}