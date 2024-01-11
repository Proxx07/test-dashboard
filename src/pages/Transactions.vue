<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";

import {useTransactions} from "@/hooks/useTransactions.ts";

const {list, tableHeaders, isFetching, filter, filterHandler} = useTransactions()
</script>

<template>
  <page-top-part
    heading="Транзакции"
    v-model:from-date="filter.fromDate"
    v-model:to-date="filter.toDate"
    @filter-changed="filterHandler"
  />

  <main>
    <v-table class="table" :table-headers="tableHeaders" :table-list="list" :loading="isFetching"/>
  </main>
</template>

<style lang="scss" scoped></style>