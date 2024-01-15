import $axios from "@/api/axios.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUser} from "@/models/interfaces/usersInterfaces.ts";

import {AUTH_TOKEN_NAME, USER_ROLE} from "@/models/staticContent/constants.ts";
import {Cookies} from "@/plugins/cookies.ts";

import {checkUserAccess} from "@/utils/roles.ts";

export const checkUserRole = async (to: any) => {
  const isUser = Cookies.get(AUTH_TOKEN_NAME)
  if (to.name === 'auth') {
    if (isUser) return {name: 'main'}
  }

  else {
    if (!isUser) return {name: 'auth'}

    try {
      const {data: {result}} = await $axios.get<IResponse<IUser>>('/auth/self')
      localStorage.setItem(USER_ROLE, `${result.role}`)

      if (checkUserAccess(to.meta.access)) return true
      return {name: "no-permission"}
    }
    catch (e) {
      Cookies.remove(AUTH_TOKEN_NAME)
      localStorage.removeItem(USER_ROLE)
      return {name: 'auth'}
    }
  }
  return true
};
