import {ITableHead} from "../interfaces/tableInterfaces";

export const eventsThead: ITableHead[] = [
  {
    name: "Тип ошибки",
    value: "type",
    width: '50%',
    defaultText: "UNDEFINED_ERROR"
  },

  {
    name: "Код ошибки",
    value: "errorCode"
  },

  {
    name: "Количество",
    value: "count"
  },
]