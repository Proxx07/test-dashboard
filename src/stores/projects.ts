import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";

export const useProjectsStore = defineStore('projects', () => {
  const $router = useRouter();

  const activeProject = ref<string>("")

  const setActiveProject = (value: string) => {
    activeProject.value = value
  }

  const isProjectFieldEnabled = computed<boolean>(() => {
    const enableInRoutes: string[] = ['main', 'dashboard']
    return enableInRoutes.includes($router.currentRoute.value.name as string)
  })

  return {
    activeProject,
    isProjectFieldEnabled,
    setActiveProject
  }
});