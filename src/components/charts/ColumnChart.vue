<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {formatters} from "@/utils/scripts.ts";
import PercentLabel from "@/components/charts/PercentLabel.vue";

const props = defineProps<{
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
          formatter: props.formatterX && formatters[props.formatterX],
        },

        y: {
          formatter: props.formatterY && formatters[props.formatterY],
        }
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
      <div class="chart__info-left">
        <div class="chart__info-count" v-if="count">
          {{ count }}
        </div>

        <div class="chart__info-note" v-if="note">
          {{ note }}
        </div>
      </div>
      <div class="chart__info-right" v-if="percent?.value">
        <percent-label :increase="percent?.increase" :value="percent?.value"/>
      </div>


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
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: 1px solid var(--ContentBorderColor);
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1.6rem 1.6rem 0;
    &-count {
      font-size: 4.2rem;
      font-weight: 600;
    }

    &-note {
      font-size: 1.2rem;
    }
  }
}
</style>