<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";
import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";

const {sortedList, isFetching, dateInterval, filterHandler} = useErrorsStatistic();
</script>

<template>
  <page-top-part
    heading="Статистика ошибок"
    v-model:date="dateInterval"
    @filter-changed="filterHandler"
  />

  <main>
    <v-table :table-headers="eventsThead" :table-list="sortedList" :loading="isFetching"/>
  </main>
</template>

<style lang="scss" scoped></style>