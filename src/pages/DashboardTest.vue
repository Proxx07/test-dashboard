<script setup lang="ts">
import PageTopPart from "@/components/PageTopPart.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";

import {useDashboard} from "@/hooks/charts/useDashboard.ts";

const {
  dateInterval, isLoading, categories,

  eventsData, eventsDifference, eventsTotal,
  livenessData, livenessDifference, livenessTotal,
  matchingData, matchingDifference, matchingTotal,
  devicesData, devicesDifference, devicesTotal,
  browsersData, browsersDifference, browsersTotal,
  errorsSeries, errorCategories, errorNote,

  filterHandler
} = useDashboard();

const chartColors = ['rgba(23, 217, 90, 1)', 'rgba(255, 245, 0, 1)', 'rgba(118, 74, 230, 1)'];

</script>

<template>
  <page-top-part
    heading="Заголовок"
    v-model:date="dateInterval"
    @filter-changed="filterHandler"
  />

  <main class="charts-wrapper">
    <column-chart
      title="События"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="eventsData"
      :percent="eventsDifference"
      :count="eventsTotal"
    />

    <column-chart
      title="Количество Liveness"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="livenessData"
      :percent="livenessDifference"
      :count="livenessTotal"
    />

    <column-chart
      title="Количество Matching"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="matchingData"
      :percent="matchingDifference"
      :count="matchingTotal"
    />

    <column-chart
      title="Типы ошибок"
      type="donut"
      direction="row"
      class="error-statistics"
      :note="errorNote"
      :loading="isLoading"
      :series="errorsSeries"
      :categories="errorCategories"
    />

    <div class="empty" style="background: #fff;"></div>

    <column-chart
      title="Мобильные устройства"
      type="bar"
      :colors="chartColors"
      :categories="categories"
      :loading="isLoading"
      :series="devicesData"
      :percent="devicesDifference"
      :count="devicesTotal"
    />

    <column-chart
      title="Веб-браузер"
      type="bar"
      :colors="chartColors"
      :categories="categories"
      :loading="isLoading"
      :series="browsersData"
      :percent="browsersDifference"
      :count="browsersTotal"
    />

    <div class="empty" style="background: #fff;"></div>
  </main>
</template>

<style scoped lang="scss">
.charts-wrapper {
  display: grid;
  gap: 2.4rem;
  max-width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  padding-top: 1.5rem;
  overflow-x: hidden;
}

.error-statistics {
  background: var(--bg-5);
  border-radius: var(--radius-m);
  grid-area: 2 / 1 / 3 / 3;
  min-height: 29rem;
}

</style>