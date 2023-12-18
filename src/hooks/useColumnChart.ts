import {formatters} from "@/utils/scripts.ts";
import {computed} from "vue";

export interface IChartProps {
  title: string,

  data: Array<number | string>,
  categories: Array<number | string>,
  type: 'bar' | 'area',

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

  const options = computed(() => {
    return {
      series: [{
        name: props.tooltipNote ?? "",
        data: props.data,
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: props.type,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          borderColor: linesColor,
        },
        xaxis: {
          categories: props.categories,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            ...labelStyles
          }
        },
        yaxis: [
          {
            tickAmount: 6,
            ...axisYBorderOptions,
            labels: {
              ...labelStyles
            }
          },
          {
            opposite: true,
            ...axisYBorderOptions,
            labels: {
              show: false
            },
          }
        ],
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

  const linesColor = "#ECECEC"

  const axisYBorderOptions = {
    show: true,
    axisBorder: {
      show: true,
      color: linesColor,
      offsetY: 2
    },
    axisTicks: {
      show: false
    },
  }

  const labelStyles = {
    style: {
      fontSize: '1rem',
      fontFamily: 'Montserrat, sans-serif',
    }
  }

  return {
    options
  }
}