<script setup lang="ts">
import {ref, watch} from "vue";
import VueApexCharts from "vue3-apexcharts";
import EmptyText from "@/components/EmptyText.vue";

import {IChartConfigProps, IChartProps} from "@/hooks/charts/types.ts";
import {useChartOptions} from "@/hooks/charts/useChartOptions.ts";
import {useChartDetails} from "@/hooks/charts/useChartDetails.ts";
import ChartStats from "@/components/charts/ChartStats.vue";

type IProps = IChartProps & IChartConfigProps;
const props = defineProps<IProps>()

const {chartOptions} = useChartOptions(props as IChartConfigProps);
const {chipType, statsNames, statsValues} = useChartDetails(props);


const chart = ref();
const activeCharts = props.type === 'bar' ? ref<string[]>(statsNames.value.map(i => i)) : undefined
const toggleCategory = (value: string) => {
  if (!value || !chart.value || !Array.isArray(activeCharts?.value)) return
  chart.value.toggleSeries(value)
  activeCharts?.value.includes(value) ? activeCharts.value = activeCharts?.value.filter((str) => str !== value) : activeCharts?.value.push(value)
};

watch(() => props.loading, () => {
  if (activeCharts) activeCharts.value = statsNames.value.map(i => i)
});

</script>

<template>
  <div class="chart">
    <div class="chart__title">
      <div class="chart__title-name">
        {{ title }}
      </div>

      <div class="chart__title-right">
        <div class="chart__title-details">
          <div class="chart__count" v-if="count !== undefined">
            <v-preloader type="dots" v-if="loading"/>
            <template v-else>
              {{`${count}`}}
            </template>
          </div>
          <div class="chart__note" v-if="note">
            {{ note }}
          </div>
        </div>

        <v-chip v-if="percent?.value && count && !loading" :type="chipType" icon>
          {{ percent?.value }}
        </v-chip>
      </div>
    </div>
    <div :class="['chart-content', props.direction ?? 'column']">
      <div :class="['chart__body', loading || !series.length ? 'align-center' : '']">
        <v-preloader v-if="loading"/>
        <empty-text v-else-if="!series.length">
          За текущий пероид <br> данные не найдены...
        </empty-text>
        <vue-apex-charts v-else ref="chart" :options="chartOptions" :series="props.series" height="100%"/>
      </div>
      <div class="chart-stats">
        <chart-stats
          :series="statsValues"
          :categories="statsNames"
          :colors="chartOptions.colors"
          :borders="!!statBorders"
          :loading="loading"
          :active-charts="activeCharts"
          @item-click="toggleCategory"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  background: var(--bg-5);
  border-radius: var(--radius-m);
  padding: 1.4rem 0;

  &__title {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    &-name {
      flex-grow: 1;
      font: var(--font-xm-m);
    }

    &-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  &__count {
    font: var(--font-xl);
  }

  &__note {
    font: var(--font-xs-m);
  }

  &__body {
    padding: 0 1.1rem 0 0.2rem;
    flex-grow: 1;
    min-height: 27rem;

    :deep(.loader.circle) {
      min-width: 6rem;
      min-height: 6rem;
    }
  }
}

.chart-content.row {
  display: flex;
  align-items: center;
  padding: 0 2rem;

  .chart__body {
    width: 21rem;
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