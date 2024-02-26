import {computed, ref} from "vue";
import {useDateIntervalStore, useProjectsStore} from "@/stores";

export const useFilter = () => {
  const projectStore = useProjectsStore();
  const dateStore = useDateIntervalStore();

  const page = ref<number>(1);
  const search = ref<string>("");

  const projectID = computed(() => projectStore.activeProject);
  const dateInterval = computed(() => dateStore.dateInterval);

  return {
    page,
    search,
    dateInterval,
    projectID,
  }
}