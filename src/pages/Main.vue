<script setup lang="ts">
import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
//import FilterDeviceTypes from "@/components/filters/FilterDeviceTypes.vue";

const {sortedList, isFetching, filter, filterHandler} = useErrorsStatistic();

</script>

<template>
  <Header title="Cтатистика по сверке лиц"/>

  <div class="main-page-filter">
    <!--
      <filter-device-types/>
    -->

    <filter-date-component
      v-model:from-date="filter.fromDate"
      v-model:to-date="filter.toDate"
      @filter-changed="filterHandler"
    />
  </div>

  <main>
    <v-table class="table" :table-headers="eventsThead" :table-list="sortedList" :loading="isFetching"/>
  </main>
</template>

<style lang="scss" scoped>
.main-page-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  border-bottom: 1px solid var(--LayoutBorderColor);
}
</style>