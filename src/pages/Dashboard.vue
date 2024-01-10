<script setup lang="ts">
import {computed, ref} from "vue";

import ColumnChart from "@/components/charts/ColumnChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";

import {useDashboard} from "@/hooks/useDashboard.ts";
import PageTopPart from "@/components/PageTopPart.vue";
const {filter, filterHandler} = useDashboard();

const data1 = ref<number[]>([21, 22, 10, 28, 16, 21, 13])
const categories1 = ref<string[]>(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вск'])

const data2 = ref<number[]>([20, 23, 22, 10, 30, 45, 50, 1, 10, 20])
const categories2 = ref<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

const donutData = [
  {
    name: 'Неправильное положение лица',
    value: 30,
    difference: {
      type: 'inc',
      value: 20
    }
  },

  {
    name: 'Низкое качество изображения',
    value: 70,
    difference: {
      type: 'dec',
      value: 15
    }
  }
];

const donutSeries = computed(() => donutData.map(item => item.value));
const donutLabels = computed(() => donutData.map(item => item.name));
const donutDifferecne = computed(() => donutData.map(item => item.difference));

const searchQuery = ref("")
</script>

<template>

  <page-top-part
    heading="Заголовок"
    v-model:from-date="filter.fromDate"
    v-model:to-date="filter.toDate"
    v-model:search-query="searchQuery"
    @filter-changed="filterHandler"
  />

  {{filter}}
  {{searchQuery}}

  <main class="charts-wrapper" style="display: none">
    <column-chart
      title="Заголовок 1"
      type="area"
      note="Частота попыток несанкционированного доступа (выражена в %)"
      :percent="{value: '20', increase: true}"
      formatter-x="weeks"
      formatter-y="percent"
      :data="data1"
      :categories="categories1"
    />

    <column-chart
      title="Заголовок 2"
      tooltip-note="Количество"
      type="bar"
      formatter-x="weeks"
      :data="data1"
      :categories="categories1"
    />

    <div class="line-charts-wrapper">
      <div></div>
      <div></div>
    </div>

    <column-chart
      title="Заголовок 3"
      tooltip-note="Количество"
      type="bar"
      :data="data2"
      :categories="categories2"
    />

    <column-chart
      title="Заголовок 4"
      type="area"
      count="70"
      :percent="{value: '20', increase: false}"
      formatter-y="percent"
      :data="data2"
      :categories="categories2"
    />

    <donut-chart
      :data="donutSeries"
      :categories="donutLabels"
      :difference="donutDifferecne"
    />

  </main>
</template>

<style scoped lang="scss">
.dashboard-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  border-bottom: 1px solid var(--LayoutBorderColor);
  &__left {
    max-width: 30rem;
  }
}

.charts-wrapper {
  display: grid;
  grid-template-columns: repeat(2, calc(35% - 1.6rem)) calc(30% - 1.6rem);
  gap: 2.4rem;
  max-width: 100%;
  overflow-x: hidden;
}

.line-charts-wrapper {
  display: grid;
  grid-template-columns: 1fr;
}
</style>