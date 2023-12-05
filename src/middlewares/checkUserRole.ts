import {checkUserAccess} from "@/utils/roles.ts";
import {AUTH_TOKEN_NAME, USER_ID_KEY, USER_ROLE} from "@/models/staticContent/constants.ts";
import $axios from "@/api/axios.ts";
import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUserWithDate} from "@/models/interfaces/usersInterfaces.ts";

export const checkUserRole = async (to: any) => {
  const userID = localStorage.getItem(USER_ID_KEY)
  if (to.name === 'auth') {
    if (userID) return {name: 'main'}
  }

  else {
    if (!userID) return {name: 'auth'}

    try {
      const {data: {result}}: AxiosResponse<IResponse<IUserWithDate>> = await $axios.get('/auth/self')
      localStorage.setItem(USER_ROLE, `${result.role}`)
      checkUserAccess()
      if (checkUserAccess(to.meta.access)) return true
      return {name: "no-permission"}
    }
    catch (e) {
      localStorage.removeItem(AUTH_TOKEN_NAME)
      localStorage.removeItem(USER_ID_KEY)
      localStorage.removeItem(USER_ROLE)
      return {name: 'auth'}
    }
  }
  return true
};
