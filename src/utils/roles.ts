import {USER_ROLE} from "@/models/staticContent/constants.ts";

export enum roles {
  main = 0,
  admin = 1,
  moderator = 2,
  operator = 3
}

export const rolesList = [
  {
    name: "Администратор",
    value: roles.admin
  },

  {
    name: 'Модератор',
    value: roles.moderator
  },

  {
    name: "Оператор",
    value: roles.operator
  }
]

export enum accesses {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  READ_USER = "READ_USER",

  CREATE_PROJECTS = "CREATE_PROJECTS",
  UPDATE_PROJECTS = "UPDATE_PROJECTS",
  DELETE_PROJECTS = "DELETE_PROJECTS",
  READ_PROJECTS = "READ_PROJECTS",
}

const rolesAccesses: Record<string, string[]> = {
  main: [
    accesses.READ_USER,
    accesses.CREATE_USER,
    accesses.UPDATE_USER,
    accesses.DELETE_USER,

    accesses.READ_PROJECTS
  ],

  admin: [],
  moderator: [],
  operator: []
}

const getUserRoleName = () => {
  const userRole = localStorage.getItem(USER_ROLE)
  for (let key of Object.keys(roles)) {
    // @ts-ignore
    if (+userRole === roles[key]) return key
  }
}

export const checkUserAccess = (accesses: accesses | void): boolean => {
  const roleName = getUserRoleName()
  if (!roleName) return false
  if (!accesses) return true
  return rolesAccesses[roleName].includes(accesses)
}