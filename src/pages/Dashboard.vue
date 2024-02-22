<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";

import VChart from "@/components/charts/VChart.vue";

import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/composables/dashboards/useErrorStatistics.ts";

const {dateInterval, isFetching, sortedList, series, categories, filterHandler} = useErrorsStatistic();

</script>

<template>
  <page-top-part
    v-model:date="dateInterval"
    heading="Статистика ошибок"
    :isLoading="isFetching"
    @filter-changed="filterHandler"
  />

  <main class="table-with-chart">

    <div class="chart-wrapper styled-scroll" :class="{'fill-bg': !sortedList.length && !isFetching}">

      <v-chart
        type="donut"
        :loading="isFetching"
        :series="series"
        :categories="categories"
        stat-borders
      />

    </div>

    <div class="table-wrapper styled-scroll">
      <v-table :table-headers="eventsThead" :table-list="sortedList" :loading="isFetching"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.table-with-chart {
  display: grid;
  grid-template-columns: 32.5rem auto;
  gap: 2rem;
  padding-bottom: 0;
  overflow: hidden;
  :deep(.chart) {
    width: 100%;
    background: none;
  }
}
.chart-wrapper {
  margin-top: .5rem;
  border-radius: var(--radius-m);
  transition: var(--transition-slow);
  color: var(--primary-color);
  //padding-right: .5rem;

  &.fill-bg {
    background: var(--bg-10);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.styled-scroll {
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 12rem;
}
</style>