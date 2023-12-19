<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import PercentLabel from "@/components/charts/PercentLabel.vue";
import { useColumnChart, IChartProps } from "@/hooks/useColumnChart.ts";

const props = defineProps<IChartProps>()
const { options } = useColumnChart(props);
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
  display: flex;
  flex-direction: column;
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

  &__body {
    margin-top: auto;
  }
}
</style>