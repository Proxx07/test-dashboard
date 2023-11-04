import {IFilterTypes} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
export const filterAppTypes: IFilterTypes[] = [
  {
    name: "Все",
    value: "all"
  },

  {
    name: "Мобильный",
    value: "mobile"
  },

  {
    name: "Веб",
    value: "web"
  },

  {
    name: "Планшет",
    value: "tablet"
  }
];

export const filterDateTypes = [
  {
    name: "За день",
    value: getDateInterval(0)
  },

  {
    name: "За неделю",
    value: getDateInterval(7)
  },

  {
    name: "За месяц",
    value: getDateInterval(30)
  },

  {
    name: "За год",
    value: getDateInterval(365)
  },
]