import $axios from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";

import {ref} from "vue";

import {defineStore} from "pinia";
import {useUser} from "@/hooks/useUsers.ts";
import {useProjectsStore} from "@/stores/projects.ts";

export const useUserStore = defineStore('user', () => {
  const {setActiveProject} = useProjectsStore();
  const {setUser} = useUser();

  const user = ref<IUser>(setUser())

  const getUser = async () => {
    const {data: {result}} = await $axios.get<IResponse<IUser>>('/auth/self')
    setStoreUser(result)
    setActiveProject(result.projectId)
  }

  const setStoreUser = ($user: IUser) => {
    user.value = setUser($user)
  }

  return {
    user,
    setStoreUser,

    getUser
  }
})