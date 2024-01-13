import $axios from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";

import {AUTH_TOKEN_NAME, USER_ID_KEY, USER_ROLE} from "@/models/staticContent/constants.ts";

import {checkUserAccess} from "@/utils/roles.ts";

export const checkUserRole = async (to: any) => {
  const userID = localStorage.getItem(USER_ID_KEY)
  if (to.name === 'auth') {
    if (userID) return {name: 'main'}
  }

  else {
    if (!userID) return {name: 'auth'}

    try {
      const {data: {result}} = await $axios.get<IResponse<IUser>>('/auth/self')
      localStorage.setItem(USER_ROLE, `${result.role}`)

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
