<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {formatters} from "@/utils/scripts.ts";
import ChartStats from "@/components/charts/ChartStats.vue";

const props = defineProps<{
  data: number[]
  categories: string[]
}>()

const chartOptions = {
  series: props.data,
  labels: props.categories,
  chart: {
    type: 'donut',
    width: "500px",
    height: "500px"
  },
  colors: ['rgb(0, 173, 238)', 'rgb(13, 155, 63)'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0,
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
      bottom: -200
    }
  },
  legend: {
    show: false,
  },
  tooltip: {
    y: {
      formatter: formatters['percent'],
    },
    /*
    custom: (a: any) => {
      return `
        <div>
          <h1 style="color: #fff;">${chartOptions.series[a.seriesIndex]}</h1>
          <h2 style="color: #fff;">${chartOptions.labels[a.seriesIndex]}</h2>
        </div>`
    },
    */
  }
}
</script>

<template>
  <div class="chart">
    <div class="chart__title">
      Типы ошибок распознования
    </div>

    <chart-stats class="chart__info" :series="data" :categories="categories" :colors="chartOptions.colors"/>

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
  align-items: center;

  &__title {
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: 1px solid var(--ContentBorderColor);
    width: 100%;
  }

  &__body {
    margin-top: auto;
    padding-top: 2rem;
    min-width: 550px;
    overflow: hidden;
    width: 100%;
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1.6rem;
    width: 100%;
  }
}
</style>