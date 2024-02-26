import $axios from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IMockProject, IProject} from "@/models/interfaces/projectsIntefaces.ts";

import {computed, onMounted, ref} from "vue";

import {accesses, checkUserAccess} from "@/utils/roles.ts";
import {useToast} from "@/composables/useToast.ts";

const $toast = useToast();
export const useProjects = () => {
  const list = ref<IMockProject[]>([
    {
      id: "9DyBcQaAA_bTD65l8E8PU",
      logo: "",
      name: "UZIMEI",
      mail: "info@uzimei.uz",
      phone: "1170",
      site: "https://uzimei.uz",
      status: 1,
    }
  ]);
  if (import.meta.env.MODE === 'development') {
    list.value.push({
      id: "test_id",
      logo: "",
      name: "Test project",
      mail: "test@test.test",
      site: "https://neotech.uz",
      status: 0,
    })
  }

  const isFetching = ref<boolean>(false);
  const totalPages = ref<number>(1);

  const selectOptions = ref<IProject[]>([])
  const options = computed(() => {
    return selectOptions.value.map(item => ({
      name: item.name,
      value: item.id
    }))
  })

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}} = await $axios.get<IResponse<IProject[]>>('/projects')
      selectOptions.value = result
    }
    catch (_) {
      $toast.error('Не удалось загрузить проекты')
    }
    finally {
      isFetching.value = false
    }
  };

  onMounted(() => {
    if (checkUserAccess(accesses.READ_PROJECTS)) {
      fetchData()
    }
  })
  return {
    list,
    totalPages,
    options,
    isFetching,

    fetchData,
  }
}

export const useProject = () => {
  const setProject = (project: IMockProject | void): IMockProject => {
    return {
      id: project?.id || "",
      name: project?.name || "",
      logo: project?.logo || "",
      mail: project?.mail || "",
      phone: project?.phone || "",
      site: project?.site || "",
      status: project?.status || 0,
    }
  }
  const isPreviewOpened = ref(false);
  const activeProject = ref<IMockProject>(setProject())


  /*const getProject = async (projectID: string) => {
    const {data: {result}} = await $axios.get<IResponse<IProject>>(`/projects/${projectID}`)
    console.log(result)
  }*/

  const previewHandler = (value: IMockProject) => {
    isPreviewOpened.value = true
    activeProject.value = setProject(value)
  }

  const editHandler = (value: IMockProject) => {
    console.log(value)
  }

  return {
    isPreviewOpened,
    activeProject,

    previewHandler,
    editHandler,
  }
}