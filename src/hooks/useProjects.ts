import $axios from "@/api/axios.ts";
import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IProject} from "@/models/interfaces/projectsIntefaces.ts";

import {computed, onMounted, ref} from "vue";

import {accesses, checkUserAccess} from "@/utils/roles.ts";

export const useProjects = () => {
  const list = ref([
    {
      logo: "",
      name: "UZIMEI",
      site: "https://uzimei.uz"
    }
  ]);
  const isFetching = ref<boolean>(false);
  const totalPages = ref<number>(1);

  const selectOptions = ref<IProject[]>([])
  const options = computed(() => {
    return selectOptions.value.map(item => ({
      name: item.name,
      value: item.id
    })
  )
  })

  const fetchData = async () => {
    isFetching.value = true
    try {
      const {data: {result}}: AxiosResponse<IResponse<IProject[]>> = await $axios.get('/projects')
      selectOptions.value = result
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
    fetchData,
  }
}