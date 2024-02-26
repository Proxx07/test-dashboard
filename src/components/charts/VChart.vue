<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import ChartTitle from "@/components/charts/ChartTitle.vue";
import EmptyText from "@/components/EmptyText.vue";
import ChartStats from "@/components/charts/ChartStats.vue";

import {IChartConfigProps, IChartProps} from "@/composables/charts/types.ts";
import {useChartOptions} from "@/composables/charts/useChartOptions.ts";
import {useChartDetails} from "@/composables/charts/useChartDetails.ts";
import {computed} from "vue";

type IProps = IChartProps & IChartConfigProps;
const props = defineProps<IProps>()

const {chartOptions} = useChartOptions(props as IProps);
const {statsNames, statsValues, chart, activeCharts, toggleCategory} = useChartDetails(props);

const chartClass = computed(() => props.pie ? 'pie-chart' : props.horizontal ? 'horizontal' : "")
const statsDirection = computed(() => props.direction ?? 'column')
const chartBodyClass = computed(() => props.loading || !props.series.length ? 'align-center' : '')
</script>

<template>
  <v-card :class="['chart', chartClass]">
    <chart-title :title="title" :note="note" :count="count" :percent="percent" :loading="loading"/>

    <div :class="['chart-content', statsDirection]">
      <div :class="['chart__body', chartBodyClass]">
        <v-preloader v-if="loading"/>

        <empty-text v-else-if="!series.length">
          За текущий пероид <br> данные не найдены...
        </empty-text>

        <vue-apex-charts v-else ref="chart" :options="chartOptions" :series="props.series" height="100%"/>
      </div>

      <div class="chart-stats" v-if="props.type !== 'area'">
        <chart-stats
          :series="statsValues"
          :categories="statsNames"
          :colors="chartOptions.colors"
          :borders="!!statBorders"
          :loading="loading"
          :active-charts="activeCharts"
          :stats-direction="statsDirection"
          @item-click="toggleCategory"
        />
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  &__body {
    padding: 0 1.1rem 0 0.2rem;
    flex-grow: 1;
    min-height: 27rem;

    :deep(.loader.circle) {
      min-width: 6rem;
      min-height: 6rem;
    }
  }

  &.pie-chart :deep(.stats){
    max-width: 35rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .stats__item {
      padding: 0;
    }
  }
}

.chart-content.row {
  display: flex;
  align-items: center;
  padding: 0 2rem;

  .chart__body {
    max-width: 23rem;
    height: 25rem;
    min-height: 0;
  }

  .chart-stats {
    flex-grow: 1;
  }
}

.align-center {
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>