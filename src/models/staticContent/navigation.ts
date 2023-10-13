interface INavigation {
  name: string,
  link: string
}
export const navigation: INavigation[] = [
  {
    name: "Дашборд",
    link: "/"
  },

  {
    name: "События",
    link: "/events"
  },

  {
    name: "Пользователи",
    link: "/users"
  },

  {
    name: "Устройства",
    link: "/devices"
  },

  {
    name: "Настройки",
    link: "/settings"
  }
]