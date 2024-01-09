<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import {eventsThead} from "@/models/staticContent/eventsTable.ts";
import {useErrorsStatistic} from "@/hooks/useErrorsStatistic.ts";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
import {accesses, checkUserAccess} from "@/utils/roles.ts";
import {useProjects} from "@/hooks/useProjects.ts";
import {useProjectsStore} from "@/stores/projects.ts";
//import FilterDeviceTypes from "@/components/filters/FilterDeviceTypes.vue";

const {sortedList, isFetching, filter, filterHandler} = useErrorsStatistic();
const {options} = useProjects()
const store = useProjectsStore()
</script>

<template>
  <div class="main-page-filter">
    <div class="main-page-filter__left">
      <!--
        <filter-device-types/>
      -->
      <v-select
        v-if="checkUserAccess(accesses.READ_PROJECTS)"
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
    <span>{{store.activeProject}}</span>
    <v-table class="table" :table-headers="eventsThead" :table-list="sortedList" :loading="isFetching"/>
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
    margin-bottom: -1px;
    margin-left: -1px;
  }
}
</style>