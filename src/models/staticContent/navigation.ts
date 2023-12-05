//import clock from '@/assets/icons/clock.svg?raw';
import briefcase from '@/assets/icons/briefcase.svg?raw';
import database from '@/assets/icons/database.svg?raw';
import users from '@/assets/icons/users.svg?raw';
import arrow from '@/assets/icons/arrow.svg?raw';
import {accesses} from "@/utils/roles.ts";

export interface INavigation {
  name: string
  link: string
  icon?: string
  access?: accesses
}
export const navigation: INavigation[] = [

  {
    name: "Дашборд",
    link: "/",
    icon: database
  },

  /*{
    name: "События",
    link: "/events",
    icon: clock
  },*/

  {
    name: "Пользователи",
    link: "/users",
    icon: users,
    access: accesses.READ_USER
  },

  {
    name: "Проекты",
    link: "/projects",
    icon: briefcase
  },

  {
    name: "Транзакции",
    link: "/reports",
    icon: arrow
  }
]