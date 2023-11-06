<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/api/axios.ts";

import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import VPagination from "@/components/VPagination.vue";
import MainPageFilter from "@/components/filters/MainPageFilter.vue";

import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {getDateInterval} from "@/utils/scripts.ts";
import {IErrorItem, IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";

const list = ref([]);

const filter = ref<IFilter>({
  fromDate: getDateInterval(0) as string,
  toDate: getDateInterval(0) as string,
  projectId: null
});

const isFetching = ref<boolean>(false)
const fetchData = async () => {
  isFetching.value = true
  const res = await request.post<IResponse<IErrorItem[]>>('/statistic/by_check', filter.value)
  isFetching.value = false
  list.value = res.result
}

const filterHandler = () => {
  fetchData()
}
const pageHandler = (page: string | number) => {
  console.log(page)
}


onMounted(() => {
  fetchData()
})

</script>

<template>
  <Header/>
  <main-page-filter
    v-model:fromDate="filter.fromDate"
    v-model:toDate="filter.toDate"
    v-model:projectId="filter.projectId"
    @filter-changed="filterHandler"
  />
  <v-table class="table" :table-headers="eventsThead" :table-list="list"/>
  <v-pagination :total-pages="20" @page-change="pageHandler"/>
</template>

<style scoped>
.table {
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
}
</style>