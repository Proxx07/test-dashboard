import {ref} from "vue";
import {defineStore} from "pinia";

export const useProjectsStore = defineStore('projects', () => {
  const activeProject = ref<string>("")

  const setActiveProject = (value: string) => {
    activeProject.value = value
  }

  return {
    activeProject,
    setActiveProject
  }
});