<script setup lang="ts">
import {computed} from "vue";
import VueApexCharts from "vue3-apexcharts";
import EmptyText from "@/components/EmptyText.vue";

import {IChartConfigProps, IChartProps} from "@/hooks/charts/types.ts";
import {useChartOptions} from "@/hooks/charts/useChartOptions.ts";

type IProps = IChartProps & IChartConfigProps;
const props = defineProps<IProps>()

const {chartOptions} = useChartOptions(props as IChartConfigProps);
const chipType = computed<string>(() => props.percent?.increase ? 'positive' : 'negative')
</script>

<template>
  <div class="chart">
    <div class="chart__title">
      <div class="chart__title-name">
        {{ title }}
      </div>

      <div class="chart__title-right">
        <div class="chart__title-details">
          <div class="chart__count" v-if="count !== undefined"> {{ `${count}` }} </div>
          <div class="chart__note" v-if="note"> {{ note }} </div>
        </div>

        <v-chip v-if="percent?.value && count" :type="chipType" icon>
          {{percent?.value}}
        </v-chip>
      </div>

    </div>

    <div :class="['chart__body', loading && 'align-center']">
      <v-preloader v-if="loading"/>
      <empty-text v-else-if="!series.length">
        За текущий пероид <br> данные не найдены...
      </empty-text>

      <vue-apex-charts v-else ref="chart" :options="chartOptions" :series="props.series" height="100%"/>
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
  max-height: 34.5rem;

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
  }

  .align-center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>