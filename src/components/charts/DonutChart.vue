<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const series = [30, 70]
const chartOptions = {
  chart: {
    type: 'donut',
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
}
</script>

<template>
  <div class="chart">
    <div class="chart__title">
      asda sdad asd ads asd
    </div>

    <div class="chart__body">
      <vue-apex-charts type="donut" :options="chartOptions" :series="series"/>
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