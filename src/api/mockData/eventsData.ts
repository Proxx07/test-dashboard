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
});

export const getDeviceTypes = (): seriesType[] => ([
  {
    name: "ПК",
    data: getRandomArray(5).reduce((acc, curr) => acc += curr) * 2,
  },
  {
    name: "Мобильные",
    data: getRandomArray(5).reduce((acc, curr) => acc += curr) * 3,
  }
]);

export const getCPUData = (length: number): seriesType[] => ([
  {
    name: "",
    data: getRandomArray(length)
  }
]);

export const getVolumeData = (): seriesType[] => ([
  {
    name: "Занято",
    data: [getRandomArray(5).reduce((acc, curr) => acc += curr) * 3]
  },
  {
    name: "Свободно",
    data: [getRandomArray(5).reduce((acc, curr) => acc += curr) * 2]
  }
]);
