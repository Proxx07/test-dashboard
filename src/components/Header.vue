<script setup lang="ts">
import User from "@/components/UI/User.vue";
import AbleLogo from "@/components/AbleLogo.vue";

import {useAuth} from "@/hooks/useAuth.ts";
import {useProjectsStore, useUserStore} from "@/stores";
import {useProjects} from "@/hooks/useProjects.ts";
import {accesses, checkUserAccess} from "@/utils/roles.ts";

const { logOut } = useAuth();
const { options, isFetching } = useProjects();
const userStore = useUserStore();
const projectsStore = useProjectsStore();

</script>

<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/" class="logo-link">
        <able-logo/>
      </router-link>
    </div>

    <div class="header__right">
      <v-select
        v-if="checkUserAccess(accesses.READ_PROJECTS) && projectsStore.isProjectFieldEnabled"
        v-model="projectsStore.activeProject"
        placeholder="Выберите проект"
        :options="options"
        :loading="isFetching"
        @change="projectsStore.setActiveProject"
      />

      <User :name="userStore.user.name" @user-clicked="logOut"/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding-bottom: 2.2rem;
  align-items: center;

  .logo-link {
    display: inline-block;
    font-size: 0;
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    gap: 2.4rem;
    :deep(select) {
      font: var(--font-m);
      background-color: var(--bg-10);
      padding: .8rem 1.2rem;
      min-width: 20rem;
    }
  }
}
</style>