interface INavigation {
  name: String,
  link: String
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