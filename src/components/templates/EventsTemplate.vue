<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import VPagination from "@/components/VPagination.vue";

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
]
</script>

<template>
<!--  <v-table :table-headers="eventsThead" :table-list="list"/>-->

  <v-pagination current-page="1" total-pages="20"/>

</template>

<style scoped></style>