import {seriesType} from "@/models/interfaces/chartTypes.ts";

const getRandomArray = (length: number): number[] => Array.from({length}, (_) => Math.floor(Math.random() * 15))
export const generateDates = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  const end = new Date(endDate)
  let start = new Date(startDate)

  while (start <= end ) {
    const convertedDate = start.toISOString().split('T')[0]
    dates.push(convertedDate)
    start.setDate(start.getDate() + 1)
  }

  if (dates.length > 2) return dates;
  return Array.from({length: 24}, (_, i) => `${i < 9 ? '0'+i:i}:00`)
}

export const getEventsData = (length: number): seriesType[] => ([
  {
    name: "Успешные",
    data: getRandomArray(length),
  },
  {
    name: "Неуспешные",
    data: getRandomArray(length),
  }
]);
export const getEventsDifference = () => ({
  increase: getRandomArray(2).reduce((acc, curr) => acc += curr) % 2 === 0,
  value: getRandomArray(1)[0] + 1 + "%"
});
export const getDevicesData = (length: number): seriesType[] => ([
  {
    name: "IOS",
    data: getRandomArray(length),
  },
  {
    name: "Android",
    data: getRandomArray(length),
  },
  {
    name: "Планшеты",
    data: getRandomArray(length),
  }
]);
export const getBrowsersData = (length: number): seriesType[] => ([
  {
    name: "Safari",
    data: getRandomArray(length),
  },
  {
    name: "Chrome",
    data: getRandomArray(length),
  },
  {
    name: "Bridge",
    data: getRandomArray(length),
  }
]);

/*
export const getErrorsStatistics = (): seriesType[] => {
  const values = getRandomArray(5);
  const names = [
    "FACER_ABORTED_LIVENESS_TRANSACTION",
    "FACER_ELECTRONIC_DEVICE_DETECTED",
    "FACER_TRACK_BREAK",
    "FACER_WRONG_GEO",
    "FACER_LOW_QUALITY",
  ];

  const sortedErrors = names
    .map((name, index) => ({name, data: values[index]}))
    .sort((a, b) => b.data - a.data);

  sortedErrors.push({
    data: getRandomArray(1)[0],
    name: "OTHER_ERRORS",
  });

  return sortedErrors
}
*/

export const getFaceDetectionData = ()=> ({
  minMax: [
    {
      name: "Максимум",
      data: getRandomArray(3).reduce((acc, curr) => acc += curr),
    },
    {
      name: "Минимум",
      data: getRandomArray(3).reduce((acc, curr) => acc += curr),
    }
  ],

  success: [
    {
      name: "Успешно",
      data: getRandomArray(3).reduce((acc, curr) => acc += curr) + "%",
    },
    {
      name: "Не успешно",
      data: getRandomArray(3).reduce((acc, curr) => acc += curr) + "%",
    }
  ]
})
