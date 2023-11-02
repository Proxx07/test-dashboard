import clock from '@/assets/icons/clock.svg?raw';
import briefcase from '@/assets/icons/briefcase.svg?raw';
import database from '@/assets/icons/database.svg?raw';
import users from '@/assets/icons/users.svg?raw';

interface INavigation {
  name: string
  link: string
  icon?: string
}
export const navigation: INavigation[] = [

  {
    name: "Дашборд",
    link: "/",
    icon: database
  },

  {
    name: "События",
    link: "/events",
    icon: clock
  },

  {
    name: "Пользователи",
    link: "/users",
    icon: users
  },

  {
    name: "Проекты",
    link: "/projects",
    icon: briefcase
  }
]