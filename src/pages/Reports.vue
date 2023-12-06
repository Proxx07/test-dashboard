<script setup lang="ts">
import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
import {transationsStatisticThead} from "@/models/staticContent/mainPageContent.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";
import {useProjects} from "@/hooks/useProjects.ts";
import {accesses, checkUserAccess} from "@/utils/roles.ts";


const {isFetching, filter, statisticInformation, filterHandler} = useErrorsStatistic();
const {options} = useProjects()
</script>

<template>
  <Header title="Статистика за период"/>

  <div class="main-page-filter">
    <div class="main-page-filter__left">
      <v-select
        v-if="checkUserAccess(accesses.READ_PROECTS)"
        v-model="filter.projectId"
        placeholder="Фильтр по проектам"
        :options="options"
        auto-height
        @change="filterHandler"
      />
    </div>

    <filter-date-component
      v-model:from-date="filter.fromDate"
      v-model:to-date="filter.toDate"
      @filter-changed="filterHandler"
    />
  </div>

  <main>
    <v-table class="table" :table-headers="transationsStatisticThead" :table-list="statisticInformation" :loading="isFetching"/>
  </main>
</template>

<style lang="scss" scoped>
.main-page-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  border-bottom: 1px solid var(--LayoutBorderColor);

  &__left {
    max-width: 30rem;
  }
}
</style>