import {accesses} from "@/utils/roles.ts";

import dashboardIcon from "@/assets/icons/dashboard.svg?raw"
import usersIcon from "@/assets/icons/users.svg?raw"
import eventsIcon from "@/assets/icons/events.svg?raw"
import projectsIcon from "@/assets/icons/projects.svg?raw"
//import settingsIcon from "@/assets/icons/settings.svg?raw"

export interface INavigation {
  name: string
  link: string
  icon?: string
  access?: accesses
}
export const navigation: INavigation[] = [
  {
    name: "События",
    link: "/dashboard",
    icon: eventsIcon,
  },

  {
    name: "Дашборд",
    link: "/test",
    access: accesses.READ_DASHBOARD,
    icon: dashboardIcon,
  },

  {
    name: "Пользователи",
    link: "/users",
    access: accesses.READ_USER,
    icon: usersIcon,
  },

  {
    name: "Проекты",
    link: "/projects",
    icon: projectsIcon,
  },
/*
  {
    name: "Настройки",
    link: "/settings",
    icon: settingsIcon,
  }
*/
]