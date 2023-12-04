import {computed, ref} from "vue";
import {declination} from "@/utils/scripts.ts";

export const useProjects = () => {
  const list = ref([
    {
      logo: "",
      name: "UZIMEI",
      site: "https://uzimei.uz"
    }
  ]);

  const headerSubtitle = computed(() => {
    return `( ${1} ${declination(1, ['проект', 'проекта', 'проектов'])} )`
  });

  return {
    list,
    headerSubtitle
  }
}