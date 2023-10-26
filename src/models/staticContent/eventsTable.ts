import {ITableHead} from "../interfaces/tableInterfaces";

export const eventsThead: ITableHead[] = [
  {
    name: "Дата и время",
    value: "date"
  },

  {
    name: "Тип события",
    value: "type"
  },

  {
    name: "ID",
    value: "id"
  },

  {
    name: "Логин",
    value: "name"
  },

  {
    name: "IP-адрес",
    value: "ip"
  },

  {
    name: "Устройство",
    value: "device"
  }
]

console.log(eventsThead)