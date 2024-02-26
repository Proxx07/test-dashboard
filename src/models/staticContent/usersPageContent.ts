import {ITableHead} from "@/models/interfaces/tableInterfaces.ts";

export const usersThead: ITableHead[] = [
  {
    name: "Уникальный ID",
    value: "id",
    width: "25%"
  },

  {
    name: "Имя и Фамилия",
    value: "name",
    width: "25%"
  },

  {
    name: "Номер телефона",
    value: "phone",
    width: "25%"
  },

  {
    name: "Email",
    value: "email",
    width: "25%"
  },
]