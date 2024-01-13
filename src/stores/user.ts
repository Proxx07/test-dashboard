import $axios from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";

import {onMounted, ref} from "vue";

import {defineStore} from "pinia";
import {useUser} from "@/hooks/useUsers.ts";

export const useUserStore = defineStore('user', () => {
  const {setUser} = useUser();

  const user = ref<IUser>(setUser())

  const getUser = async () => {
    const {data: {result}} = await $axios.get<IResponse<IUser>>('/auth/self')
    setStoreUser(result)
  }

  const setStoreUser = ($user: IUser) => {
    user.value = setUser($user)
  }

  onMounted(() => {
    getUser()
  });

  return {
    user,
    setStoreUser,

    getUser
  }
})