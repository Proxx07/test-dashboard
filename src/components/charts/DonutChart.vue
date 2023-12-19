<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {formatters} from "@/utils/scripts.ts";

const chartOptions: ApexOptions = {
  series: [30, 70],
  labels: ['Неправильное положение лица', 'Низкое качество изображения'],

  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 0
    }
  },
  grid: {
    padding: {
      bottom: -180
    }
  },
  legend: {
    show: false,
  },
  tooltip: {
    custom: (a) => {
      console.log(a)
    },
    y: {
      formatter: formatters['percent'],
      /*title: {
        formatter: (seriesName: string) => `<div class="apexcharts-tooltip apexcharts-theme-light">
            <div class="apexcharts-tooltip-title">50%</div>
            <div class="apexcharts-tooltip-series-group apexcharts-active">
              <div class="apexcharts-tooltip-text">
                <div class="apexcharts-tooltip-y-group">
                  <span class="apexcharts-tooltip-text-y-label">${seriesName}</span>
                </div>
              </div>
            </div>
          </div>`
      }*/
    },
  }
}
</script>

<template>
  <div class="chart">
    <div class="chart__title">
      Типы ошибок распознования
    </div>

    <div class="chart__body">
      <vue-apex-charts type="donut" :options="chartOptions" :series="chartOptions.series"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  padding-bottom: 1.6rem;
  background: var(--WhiteBg);
  display: flex;
  flex-direction: column;

  &__title {
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: 1px solid var(--ContentBorderColor);
  }

  &__body {
    margin-top: auto;
  }
}
</style>