import {computed} from "vue";
import {formatters} from "@/utils/scripts.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

export interface IChartProps {
  title: string,

  series: seriesType[],
  categories: Array<number | string>,
  type: 'bar' | 'area',

  colors?: string[],
  formatterX?: keyof typeof formatters,
  formatterY?: keyof typeof formatters,
  tooltipNote?: string,
  count?: string | number,
  note?: string,

  percent?: {
    value: number | string,
    increase: boolean,
  },
}
export const useColumnChart = (props: IChartProps) => {
  const chartColors= props.colors ?? ['rgba(0, 137, 188, 1)', 'rgba(217, 23, 23, 1)', 'rgba(255, 245, 0, 1)', 'rgba(118, 74, 230, 1)', 'rgba(23, 217, 90, 1)', 'rgba(141, 141, 141, 1)'];

  const seriesWithDefaultName = computed<seriesType[]>(() => {
    return props.series.map(item => !item.name ? {...item, name: props.tooltipNote ?? ""} : item)
  });

  const options = computed(() => {
    return {
      series: seriesWithDefaultName.value,
      chartOptions: {
        theme: { mode: "dark" },
        chart: {
          type: props.type,
          height: 350,
          stacked: true,
          zoom: { enabled: false },
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },

        colors: chartColors,
        grid: {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },

        xaxis: {
          categories: props.categories,
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: {
            style: {
              fontSize: '1rem',
              fontFamily: 'Montserrat, sans-serif',
            }
          }
        },

        tooltip: {
          x: {
            formatter: props.formatterX && formatters[props.formatterX],
          },

          y: {
            formatter: props.formatterY && formatters[props.formatterY],
          }
        }
      },
    }
  });

  return {
    options
  }
}