import {useFilter} from "@/hooks/useFilter.ts";

export const useDashboard = () => {
  const {dateInterval} = useFilter();
  const filterHandler = () => {
    console.log('Filter changed')
  }

  return {
    dateInterval,

    filterHandler
  }
}