import {USER_ROLE} from "@/models/staticContent/constants.ts";

export enum roles {
  main = "0",
  admin = "1",
  moderator = "2",
  operator = "3"
}
export enum accesses {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

const rolesAccesses: Record<string, string[]> = {
  main: [
    accesses.CREATE_USER,
    accesses.UPDATE_USER,
    accesses.DELETE_USER,
  ],

  admin: [
    accesses.CREATE_USER,
    accesses.UPDATE_USER,
  ],

  moderator: [
    accesses.UPDATE_USER,
  ],

  operator: []
}

const getUserRoleName = () => {
  const userRole = localStorage.getItem(USER_ROLE)
  if (!userRole) return false
  for (let key of Object.keys(roles)) {
    // @ts-ignore
    if (userRole === roles[key]) return key
  }
}

export const checkUserAccess = (accesses: accesses | void): boolean => {
  const roleName = getUserRoleName()
  if (!roleName) return false
  if (!accesses) return true

  return rolesAccesses[roleName].includes(accesses)
}