<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";
import CircleChart from "@/components/charts/CircleChart.vue";
import EmptyText from "@/components/EmptyText.vue";

import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";

const {sortedList, isFetching, dateInterval, filterHandler, series, categories} = useErrorsStatistic();

</script>

<template>
  <page-top-part
    v-model:date="dateInterval"
    heading="Статистика ошибок"
    :isLoading="isFetching"
    @filter-changed="filterHandler"
  />

  <main class="table-with-chart">

    <div class="chart-wrapper styled-scroll" :class="{'fill-bg': isFetching || !series.length}">

      <v-preloader v-if="isFetching"/>

      <circle-chart v-else-if="series.length" :data="series" :categories="categories"/>

      <empty-text v-else>
        За текущий период <br> ошибок не найдено...
      </empty-text>
    </div>

    <div class="table-wrapper styled-scroll">
      <v-table :table-headers="eventsThead" :table-list="sortedList" :loading="isFetching"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.table-with-chart {
  display: grid;
  grid-template-columns: 32rem auto;
  gap: 2.4rem;
  padding-bottom: 0;
  overflow: hidden;
  :deep(.chart) {
    max-height: 100vh;
  }
}
.chart-wrapper {
  margin-top: .5rem;
  border-radius: var(--radius-m);
  transition: var(--transition-slow);
  color: var(--primary-color);

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