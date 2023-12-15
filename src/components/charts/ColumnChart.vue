<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {formatters} from "@/utils/scripts.ts";

const props = defineProps<{
  title: string,

  data: Array<number | string>,
  categories: Array<number | string>,
  type: 'bar' | 'area',

  formatter?: keyof typeof formatters,

  count?: number,
  note?: string,
  tooltipNote?: string,

  percent?: {
    value: number,
    increase: boolean,
  },
}>()

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
          style: {
            fontSize: '1rem',
            fontFamily: 'Montserrat, sans-serif',
          }
        }
      },
      yaxis: [
        {
          tickAmount: 6,
          ...axisYBorderOptions,
          labels: {
            style: {
              fontSize: '1rem',
              fontFamily: 'Montserrat, sans-serif',
            }
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
          formatter: props.formatter && formatters[props.formatter],
        },
      }
    },
  }
})

</script>

<template>
  <div class="chart">
    <div class="chart__title">
      {{ title }}
    </div>
    <div class="chart__info">
      {{ count }}
      {{ note }}

      <div class="percent-component"></div>
    </div>
    <div class="chart__body">
      <vue-apex-charts :options="options.chartOptions" :series="options.series"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  padding-bottom: 1.6rem;
  background: var(--WhiteBg);
  &__title {
    padding: 1.6rem;
    font-size: 1.3rem;
    font-weight: 600;
    border-bottom: 1px solid var(--ContentBorderColor);
  }
  &__body {
    //adding-left: 1rem;
  }
}
</style>