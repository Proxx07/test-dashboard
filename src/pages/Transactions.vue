<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";

import {useTransactions} from "@/composables/useTransactions.ts";

const {list, tableHeaders, isFetching, dateInterval, filterHandler} = useTransactions()
</script>

<template>
  <page-top-part
    v-model:date="dateInterval"
    heading="Транзакции"
    :isLoading="isFetching"
    @filter-changed="filterHandler"
  />

  <main>
    <v-table class="table" :table-headers="tableHeaders" :table-list="list" :loading="isFetching"/>
  </main>
</template>

<style lang="scss" scoped></style>