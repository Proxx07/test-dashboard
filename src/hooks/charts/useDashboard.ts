import {useFilter} from "@/hooks/useFilter.ts";
import {computed, ref} from "vue";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

import {
  getEventsDifference, generateDates,
  getEventsData, getDevicesData, getBrowsersData,
  //getErrorsStatistics,
  getFaceDetectionData,
} from "@/api/mockData/eventsData.ts";
import {declination} from "@/utils/scripts.ts";
import {useErrorsStatistic} from "@/hooks/dashboards/useErrorStatistics.ts";

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

  const faceDetection = ref(getFaceDetectionData())
  const facerSuccessData = computed(() => faceDetection.value.success.map(i => i.data))
  const facerSuccessCategories = computed(() => faceDetection.value.success.map(i => i.name))
  const facerErrorsData = computed(() => faceDetection.value.minMax.map(i => `00 : ${i.data < 9 ? '0'+i.data : i.data.toString()}`))
  const facerErrorsCategories = computed(() => faceDetection.value.minMax.map(i => i.name))

  const facerTotalNote = computed<string>(() => {
    const count = faceDetection.value.minMax[0].data * 77

    return `${count} ${declination(count, ['запрос', 'запроса', 'запросов'])}`
  })



  const {series: errorsSeries, categories: errorCategories, fetchData: fetchErrors} = useErrorsStatistic();
  const errorNote = computed(() => {
    const length = errorsSeries.value.length > 5 ? 5 : errorsSeries.value.length
    return `Топ ${length} ${declination(length,['ошибка', 'ошибки', 'ошибок'])}`
  })

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

    faceDetection.value = getFaceDetectionData()
    await fetchErrors({fromDate: dateInterval.value[0], toDate: dateInterval.value[1]})
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

    facerSuccessData,
    facerSuccessCategories,
    facerErrorsData,
    facerErrorsCategories,
    facerTotalNote,

    categories,
    isLoading,

    dateInterval,
    filterHandler
  }
}