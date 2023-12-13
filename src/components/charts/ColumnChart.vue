<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {weekDaysFormatter} from "@/utils/scripts.ts";

const props = defineProps<{
  title: string,

  data: number[],
  categories: Array<number | string>,
  type: 'bar' | 'area',
  weeksFormatter?: boolean,

  count?: number,
  note?: string,
  percent?: {
    value: number,
    increase: boolean
  }
}>()

const options = computed(() => {
  return {
    series: [{
      name: "Количество",
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

      xaxis: {
        categories: props.categories,
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
          show: true,
          axisBorder: {
            show: true,
          },
          labels: {
            style: {
              fontSize: '1rem',
              fontFamily: 'Montserrat, sans-serif',
            }
          }
        },
        {
          opposite: true,
          show: true,
          labels: {
            show: false
          },
          axisBorder: {
            show: true,
          }
        }
      ],
      tooltip: {
        x: {
          formatter: props.weeksFormatter && weekDaysFormatter,
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

</style>