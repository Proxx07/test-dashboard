<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import ChartStats from "@/components/charts/ChartStats.vue";

const props = defineProps<{
  data: number[]
  categories: Array<string | number>
}>()

const chartOptions = computed(() => {
  return {
    series: props.data,
    labels: props.categories,
    chart: {
      type: 'donut',
    },
    tooltip: {
      enabled: false
    },
    colors: ['rgba(0, 137, 188, 1)', 'rgba(217, 23, 23, 1)', 'rgba(255, 245, 0, 1)', 'rgba(118, 74, 230, 1)', 'rgba(23, 217, 90, 1)', 'rgba(141, 141, 141, 1)'],

    dataLabels: {
      enabled: false
    },

    plotOptions: {
      pie: {
        customScale: 1
      }
    },

    stroke: {
      width: 0,
    },

    legend: {
      show: false,
    },
  }
})
</script>

<template>
  <div class="chart">
    <div class="chart-graph">
      <vue-apex-charts type="donut" :options="chartOptions" :series="chartOptions.series"/>
    </div>

    <div class="chart-stats">
      <chart-stats :series="chartOptions.series" :categories="chartOptions.labels" :colors="chartOptions.colors"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {}
</style>