<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import PageTopPart from "@/components/PageTopPart.vue";

import {usersThead} from "@/models/staticContent/usersPageContent.ts";

import {useUsers} from "@/composables/useUsers.ts";
import {accesses, checkUserAccess} from "@/utils/roles.ts";

const {list, isLoadMore, fetchData, listItemHandler} = useUsers()

</script>

<template>
  <div class="users-top">
    <page-top-part
      heading="Пользователи"
      class="filter"
    />

    <router-link v-if="checkUserAccess(accesses.CREATE_USER)" :to="{name: 'user'}" class="create-user">
      <v-button class="secondary">
        Создать пользователя
      </v-button>
    </router-link>
  </div>

  <main>
    <v-table
      :table-headers="usersThead"
      :table-list="list"
      :lazy-loading="isLoadMore"
      @row-clicked="listItemHandler"
      @load-more="fetchData"
    />
  </main>

</template>

<style scoped lang="scss">
.users-top {
  display: flex;
  align-items: flex-start;
}

.filter {
  flex-grow: 1;
}

.create-user {
  text-decoration: none;
}
</style>