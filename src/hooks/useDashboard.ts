import {useFilter} from "@/hooks/useFilter.ts";

export const useDashboard = () => {
  const {dateInterval, filter} = useFilter();
  const filterHandler = () => {
    console.log(filter.value)
  }

  return {
    dateInterval,

    filterHandler
  }
}