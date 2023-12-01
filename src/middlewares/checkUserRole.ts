import {checkUserAccess} from "@/utils/roles.ts";
import {USER_ID_KEY} from "@/models/staticContent/constants.ts";
/*
import $axios from "@/api/axios.ts";
import {AxiosResponse} from "axios";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {IUserWithDate} from "@/models/interfaces/usersInterfaces.ts";
*/

export const checkUserRole = async (to: any) => {
  const userID = localStorage.getItem(USER_ID_KEY)
  if (to.name === 'auth') {
    if (userID) return {name: 'main'}
  }

  else {
    if (!userID) return {name: 'auth'}
    /*
    const {data: {result}}: AxiosResponse<IResponse<IUserWithDate>> = await $axios.get(`/users/${userID}`)
    if (!result.role) return {name: 'auth'}
    localStorage.setItem(USER_ROLE, `${result.role}`)
    checkUserAccess()
    const roleName = getUserRoleName()
    */
    if (checkUserAccess(to.meta.access)) return true
    return {name: "no-permission"}
  }
  return true
};
