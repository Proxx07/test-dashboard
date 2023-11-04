<script setup lang="ts">
import {onMounted} from "vue";
import request from "@/api/axios.ts";

import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import VPagination from "@/components/VPagination.vue";
import MainPageFilter from "@/components/filters/MainPageFilter.vue";

import {eventsThead} from "@/models/staticContent/eventsTable.ts";

onMounted(async () => {
  const res = await request.post('/statistic/by_check', {
    fromDate: '2023-01-01',
    toDate: '2023-10-10',
    projectId: null
  })
  console.log(res)
})
const list = [
  {
    date: "Thu Oct 26 2023",
    type: "Тип 1",
    id: "1",
    name: "Название 1",
    ip: "ip 1",
    device: "Устройство 1"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 2",
    id: "2",
    name: "Название 2",
    ip: "ip 2",
    device: "Устройство 2"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 3",
    id: "3",
    name: "Название 3",
    ip: "ip 3",
    device: "Устройство 3"
  },

  {
    date: "Thu Oct 26 2023",
    type: "Тип 1",
    id: "1",
    name: "Название 1",
    ip: "ip 1",
    device: "Устройство 1"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 2",
    id: "2",
    name: "Название 2",
    ip: "ip 2",
    device: "Устройство 2"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 3",
    id: "3",
    name: "Название 3",
    ip: "ip 3",
    device: "Устройство 3"
  },

  {
    date: "Thu Oct 26 2023",
    type: "Тип 1",
    id: "1",
    name: "Название 1",
    ip: "ip 1",
    device: "Устройство 1"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 2",
    id: "2",
    name: "Название 2",
    ip: "ip 2",
    device: "Устройство 2"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 3",
    id: "3",
    name: "Название 3",
    ip: "ip 3",
    device: "Устройство 3"
  },

  {
    date: "Thu Oct 26 2023",
    type: "Тип 1",
    id: "1",
    name: "Название 1",
    ip: "ip 1",
    device: "Устройство 1"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 2",
    id: "2",
    name: "Название 2",
    ip: "ip 2",
    device: "Устройство 2"
  },
  {
    date: "Thu Oct 26 2023",
    type: "Тип 3",
    id: "3",
    name: "Название 3",
    ip: "ip 3",
    device: "Устройство 3"
  }
]
const pageHandler = (page: string | number) => {
  console.log(page)
}

/*const filter = ref({
  fromDate: "",
  toDate: ""
});*/

</script>

<template>
  <Header/>
  <main-page-filter/>
  <v-table class="table" :table-headers="eventsThead" :table-list="list"/>
  <v-pagination :total-pages="20" @page-change="pageHandler"/>
</template>

<style scoped>
.table {
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
}
</style>