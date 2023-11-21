<script setup lang="ts">
import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import VPagination from "@/components/VPagination.vue";
import {useUsers} from "@/hooks/useUsers.ts";
import {usersThead} from "@/models/staticContent/usersPageContent.ts";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";

const { filter, list, totalPages, headerSubtitle, isFetching, fetchData } = useUsers()

</script>

<template>

  <Header title="Список пользователей" :subtitle="headerSubtitle"/>

  <div class="users-filter">
    <div class="users-filter__search">
      <v-input v-model="filter.search" class="users-filter__input" placeholder="Поиск пользователя"/>
      <v-button class="users-filter__button primary" @click="fetchData"> Найти </v-button>
    </div>

    <filter-date-component
      v-model:from-date="filter.fromDate"
      v-model:to-date="filter.toDate"
    />
  </div>

  <main>
    <v-table class="table" :table-headers="usersThead" :table-list="list" :loading="isFetching"/>
  </main>

  <v-pagination v-if="totalPages > 1" v-model="filter.page" :total-pages="totalPages" @page-change="fetchData"/>
</template>

<style scoped lang="scss">
.users-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  border-bottom: 1px solid var(--LayoutBorderColor);
  &__search {
    display: flex;
    max-width: 430px;
  }

  &__input {
    font-size: 1.2rem;
    line-height: 1.6;
    flex-grow: 1;
  }
  &__button {
    min-width: 130px;
  }
}
</style>