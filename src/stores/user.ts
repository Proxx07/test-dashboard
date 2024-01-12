import {onMounted, ref} from "vue";
import {defineStore} from "pinia";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";
import {useUser} from "@/hooks/useUsers.ts";
import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import $axios from "@/api/axios.ts";

export const useUserStore = defineStore('user', () => {
  const {setUser} = useUser();

  const user = ref<IUser>(setUser())

  const getUser = async () => {
    const {data: {result}}: AxiosResponse<IResponse<IUser>> = await $axios.get('/auth/self')
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