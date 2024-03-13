<script setup lang="ts">
import PageTopPart from "@/components/PageTopPart.vue";
import VChart from "@/components/charts/VChart.vue";

import {useDashboard} from "@/composables/dashboards/useDashboard.ts";
import ChartTitle from "@/components/charts/ChartTitle.vue";
import ChartStats from "@/components/charts/ChartStats.vue";

const {
  dateInterval, isLoading, categories,

  eventsData, eventsDifference, eventsTotal,
  livenessData, livenessDifference, livenessTotal,
  matchingData, matchingDifference, matchingTotal,
  devicesData, devicesDifference, devicesTotal,
  browsersData, browsersDifference, browsersTotal,
  errorsSeries, errorCategories, errorNote, errorsLoading,
  facerSuccessData, facerSuccessCategories, facerErrorsData, facerErrorsCategories, facerTotalNote,
  deviceTypeSeries, deviceTypeCategory, deviceTypeTotal,
  CPUData, CPUTotal, CPUDifference,
  diskVolumeData, memoryVolumeData,

  filterHandler
} = useDashboard();

const chartColors = ['rgba(23, 217, 90, 1)', 'rgba(255, 245, 0, 1)', 'rgba(118, 74, 230, 1)'];
const volumeColors = ['rgba(0, 137, 188, 1)', 'rgba(23, 217, 90, 1)'];
</script>

<template>
  <page-top-part
    v-model:date="dateInterval"
    heading="Заголовок"
    :is-loading="isLoading"
    @filter-changed="filterHandler"
  />

  <main class="charts-wrapper">
    <v-chart
      title="События"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="eventsData"
      :percent="eventsDifference"
      :count="eventsTotal"
    />

    <v-chart
      title="Количество Liveness"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="livenessData"
      :percent="livenessDifference"
      :count="livenessTotal"
    />

    <v-chart
      title="Количество Matching"
      type="bar"
      :categories="categories"
      :loading="isLoading"
      :series="matchingData"
      :percent="matchingDifference"
      :count="matchingTotal"
    />

    <v-chart
      title="Типы ошибок"
      type="donut"
      direction="row"
      class="error-statistics"
      :note="errorNote"
      :loading="errorsLoading"
      :series="errorsSeries"
      :categories="errorCategories"
    />

    <v-card class="face-info">
      <chart-title title="Распознание лиц" :note="facerTotalNote" :loading="isLoading"/>
      <div class="face-body">
        <chart-stats :series="facerErrorsData" :categories="facerErrorsCategories" :loading="isLoading"/>
        <chart-stats :series="facerSuccessData" :categories="facerSuccessCategories" :loading="isLoading"/>
      </div>
    </v-card>

    <v-chart
      title="Мобильные устройства"
      type="bar"
      :colors="chartColors"
      :categories="categories"
      :loading="isLoading"
      :series="devicesData"
      :percent="devicesDifference"
      :count="devicesTotal"
    />

    <v-chart
      title="Веб-браузер"
      type="bar"
      :colors="chartColors"
      :categories="categories"
      :loading="isLoading"
      :series="browsersData"
      :percent="browsersDifference"
      :count="browsersTotal"
    />

    <v-chart
      title="Типы устройств"
      type="donut"
      :colors="chartColors"
      :loading="isLoading"
      :series="deviceTypeSeries"
      :count="deviceTypeTotal"
      :categories="deviceTypeCategory"
      :pie="95"
    />

    <v-chart
      title="Нагрузка на ЦП"
      type="area"
      :loading="isLoading"
      :series="CPUData"
      :categories="categories"
      :count="CPUTotal"
      :percent="CPUDifference"
    />

    <v-chart
      title="Объём диска"
      type="bar"
      :colors="volumeColors"
      :loading="isLoading"
      :series="diskVolumeData"
      horizontal
      patterned
      hide-axises
    />

    <v-chart
      title="Объём ОЗУ"
      type="bar"
      :colors="volumeColors"
      :loading="isLoading"
      :series="memoryVolumeData"
      horizontal
      patterned
      hide-axises
    />
  </main>
</template>

<style scoped lang="scss">
.face-info {
  .face-body {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-top: 3rem;
  }

  :deep(.chart__title) {
    padding-bottom: 1.4rem;
  }

  :deep(.stats__item-value) {
    font: var(--font-xl);
  }

}

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