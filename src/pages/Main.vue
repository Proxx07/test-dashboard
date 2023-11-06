<script setup lang="ts">
import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
//import VPagination from "@/components/VPagination.vue";
import MainPageFilter from "@/components/filters/MainPageFilter.vue";
import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";

const {list, isFetching, filter, filterHandler} = useErrorsStatistic()

</script>

<template>
  <Header/>
  <main-page-filter
    v-model:fromDate="filter.fromDate"
    v-model:toDate="filter.toDate"
    v-model:projectId="filter.projectId"
    @filter-changed="filterHandler"
  />
  <v-table class="table" :table-headers="eventsThead" :table-list="list" :loading="isFetching"/>
  <!-- <v-pagination :total-pages="20" @page-change="pageHandler"/> -->
</template>

<style scoped>
.table {
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
}
</style>