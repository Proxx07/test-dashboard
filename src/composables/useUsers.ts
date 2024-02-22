import $axios from "@/api/axios.ts";
import {IListResponse, IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";
import {IFilter} from "@/models/interfaces/mainPageInterfaces.ts";

import {computed, ref} from "vue";

import {useRouter} from "vue-router";
import {useToast} from "@/composables/useToast.ts";
import {useFilter} from "@/composables/useFilter.ts";

const $toast = useToast()

export const useUsers = () => {
  const $router = useRouter();
  const {page, search} = useFilter();

  const list = ref<IUser[]>([]);
  const isLoadMore = ref<boolean>(true);

  const filter = computed<IFilter>(() => {
    return {
      page: page.value,
      search: search.value,
    }
  });

  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const {data: {result}} = await $axios.get<IResponse<IListResponse<IUser[]>>>('/users', {params: filter.value})

      list.value = Array.isArray(result.result) ? [...list.value, ...result.result] : [...list.value]
      isLoadMore.value = list.value.length < result.count
      page.value += 1

    } catch (_) {
      $toast.error('Что-то пошло не так')
      isLoadMore.value = false
    }
  };

  const listItemHandler = async (value: IUser) => {
    await $router.push({name: "user-edit", params: {id: value.id}})
  }

  return {
    list,
    isLoadMore,

    fetchData,
    listItemHandler,
  }
}
