<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { useColumnChart, IChartProps } from "@/hooks/useColumnChart.ts";

const props = defineProps<IChartProps>()
const { options } = useColumnChart(props);

</script>

<template>
  <div class="chart">

    <div class="chart__title">
      {{ title }}
    </div>

    <div class="chart__info-count" v-if="count">
      {{ count }}
    </div>
<!-- <percent-label :increase="percent?.increase" :value="percent?.value"/> -->

    <div class="chart__body">
      <vue-apex-charts ref="chart" :options="options.chartOptions" :series="options.series"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  &__title {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 600;
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

  &__body {
    //margin-top: auto;
  }
}
</style>