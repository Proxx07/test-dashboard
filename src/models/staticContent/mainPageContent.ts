import {IFilterTypes} from "@/models/interfaces/mainPageInterfaces.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import {ITableHead} from "@/models/interfaces/tableInterfaces.ts";
import {accesses} from "@/utils/roles.ts";
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
    name: "День",
    value: getDateInterval(1)
  },

  {
    name: "Нелеля",
    value: getDateInterval(7)
  },

  {
    name: "Месяц",
    value: getDateInterval(30)
  },

  {
    name: "Год",
    value: getDateInterval(365)
  },
]

export const transationsStatisticThead: ITableHead[] = [
  {
    name: "Общее кол-во транзакций",
    value: "summary",
    width: '33.3333%',
    access: accesses.READ_TRANSACTIONS_SUMMARY,
  },

  {
    name: "Кол-во транзакций в ЦЭП",
    value: "gcp",
    width: '33.3333%',
    access: accesses.READ_TRANSACTIONS_GCP,
  },

  {
    name: "Кол-во транзакций для сверки лиц",
    value: "check",
    width: '33.3333%',
  },
]