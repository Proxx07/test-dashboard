<script setup lang="ts">
import Header from "@/components/Header.vue";
import VTable from "@/components/VTable.vue";
import VPagination from "@/components/VPagination.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
import {usersThead} from "@/models/staticContent/usersPageContent.ts";
import {useUsers} from "@/hooks/useUsers.ts";

const {filter, list, totalPages, headerSubtitle, isFetching, fetchData} = useUsers()

</script>

<template>

  <Header title="Список пользователей" :subtitle="headerSubtitle"/>
  <div class="users-filter">
    <div class="users-filter__search">
      <v-input v-model="filter.search" class="users-filter__input" placeholder="Поиск пользователя"/>
      <v-button class="users-filter__button primary" @click="fetchData"> Найти</v-button>
    </div>

    <div class="users-filter__left">
      <filter-date-component
        v-model:from-date="filter.fromDate"
        v-model:to-date="filter.toDate"
        @filter-changed="fetchData"
      />
      <router-link :to="{name: 'user'}" class="create-user">
        Создать пользователя
      </router-link>
    </div>
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

  &__left {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
}

.create-user {
  padding: .7rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.3s;
  background: var(--Violet);
  color: var(--white);
  text-decoration: none;
  display: inline-block;
}
</style>