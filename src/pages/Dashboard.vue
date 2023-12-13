<script setup lang="ts">
import {ref} from "vue";
import Header from "@/components/Header.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import {useDashboard} from "@/hooks/useDashboard.ts";

const {filter, filterHandler} = useDashboard();

const data1 = ref<number[]>([21, 22, 10, 28, 16, 21, 13])
const categories1 = ref<string[]>(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вск'])


const data2 = ref<number[]>([20, 23, 22, 10, 30, 45, 50, 0, 10, 20])
const categories2 = ref<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
</script>

<template>
  <Header title="Дашборд"/>
  <div class="dashboard-filter">
    <div class="dashboard-filter__left">
      <!-- <filter-device-types/> -->
    </div>
    <filter-date-component
      v-model:from-date="filter.fromDate"
      v-model:to-date="filter.toDate"
      @filter-changed="filterHandler"
    />
  </div>

  <main class="charts-wrapper">
    <column-chart title="Заголовок 1" type="bar" :data="data1" :categories="categories1" weeks-formatter/>
    <column-chart title="Заголовок 2" type="bar" :data="data1" :categories="categories1" weeks-formatter/>
    <div></div>
    <column-chart title="Заголовок 3" type="bar" :data="data1" :categories="categories1" weeks-formatter/>
    <column-chart title="Заголовок 4" type="area" :data="data2" :categories="categories2"/>
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;
}
</style>