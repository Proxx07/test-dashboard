import {ref} from "vue";
import {defineStore} from "pinia";
import {getDateInterval} from "@/utils/scripts.ts";

export const useDateIntervalStore = defineStore('date-interval', () => {
  const dateInterval = ref<[string, string]>([getDateInterval(1)[0], getDateInterval(1)[1]])

  const setDateInterval = (value: [string, string]) => {
    dateInterval.value = value
  }

  return {
    dateInterval,

    setDateInterval
  }
})