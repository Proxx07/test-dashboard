import {computed, ref} from "vue";

import {getDateInterval} from "@/utils/scripts.ts";

import {useProjectsStore} from "@/stores";

export const useFilter = () => {
  const projectStore = useProjectsStore();

  const page = ref<number>(1);
  const search = ref<string>("");
  const projectID = computed(() => projectStore.activeProject);
  const dateInterval = ref<[string, string]>([getDateInterval(1)[0], getDateInterval(1)[1]]);

  return {
    page,
    search,
    dateInterval,
    projectID,
  }
}