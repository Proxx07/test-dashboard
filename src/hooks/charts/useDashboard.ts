import {useFilter} from "@/hooks/useFilter.ts";
import {computed, ref} from "vue";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

import {
  getEventsDifference, generateDates,
  getEventsData, getDevicesData, getBrowsersData,
  getErrorsStatistics,
} from "@/api/mockData/eventsData.ts";
import {declination} from "@/utils/scripts.ts";

export const useDashboard = () => {
  const {dateInterval} = useFilter();

  const categories = computed<string[]>(() => generateDates(dateInterval.value[0], dateInterval.value[1]));
  const itemsLength = computed(() => categories.value.length);
  const isLoading = ref<boolean>(false);

  const eventsData = ref<seriesType[]>(getEventsData(itemsLength.value));
  const eventsDifference= ref(getEventsDifference());
  const eventsTotal = computed<number>(() => {
    if (!eventsData.value.length) return 0
    return eventsData.value.reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr);
  });

  const livenessData = ref<seriesType[]>(getEventsData(itemsLength.value));
  const livenessDifference = ref(getEventsDifference())
  const livenessTotal = computed<number>(() => {
    if (!livenessData.value.length) return 0
    return livenessData.value.reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr);
  });

  const matchingData = ref<seriesType[]>(getEventsData(itemsLength.value));
  const matchingDifference = ref(getEventsDifference());
  const matchingTotal = computed<number>(() => {
    if (!matchingData.value.length) return 0
    return matchingData.value.reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr);
  });

  const devicesData = ref<seriesType[]>(getDevicesData(itemsLength.value));
  const devicesDifference = ref(getEventsDifference());
  const devicesTotal= computed<number>(() => {
    if (!devicesData.value.length) return 0
    return devicesData.value.reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr);
  });

  const browsersData = ref<seriesType[]>(getBrowsersData(itemsLength.value));
  const browsersDifference = ref(getEventsDifference());
  const browsersTotal = computed<number>(() => {
    if (!browsersData.value.length) return 0
    return browsersData.value.reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr);
  });

  const errorsData = ref<seriesType[]>(getErrorsStatistics());
  const errorsSeries = computed(() => errorsData.value.map(i => i.data as number))
  const errorCategories = computed(() => errorsData.value.map(i => i.name))
  const errorNote = "Топ 5 " + declination(5,['ошибка', 'ошибки', 'ошибок'])

  const filterHandler = async () => {
    isLoading.value = true

    eventsData.value = getEventsData(itemsLength.value)
    eventsDifference.value = getEventsDifference()

    livenessData.value = getEventsData(itemsLength.value)
    livenessDifference.value = getEventsDifference()

    matchingData.value = getEventsData(itemsLength.value)
    matchingDifference.value = getEventsDifference()

    devicesData.value = getDevicesData(itemsLength.value)
    devicesDifference.value = getEventsDifference()

    browsersData.value = getBrowsersData(itemsLength.value)
    browsersDifference.value = getEventsDifference()

    errorsData.value = getErrorsStatistics()

    await new Promise(resolve => setTimeout(resolve, 700))
    isLoading.value = false
  }

  return {
    eventsData,
    eventsDifference,
    eventsTotal,

    livenessData,
    livenessDifference,
    livenessTotal,

    matchingData,
    matchingDifference,
    matchingTotal,

    devicesData,
    devicesDifference,
    devicesTotal,

    browsersData,
    browsersDifference,
    browsersTotal,

    errorsSeries,
    errorCategories,
    errorNote,

    categories,
    isLoading,

    dateInterval,
    filterHandler
  }
}