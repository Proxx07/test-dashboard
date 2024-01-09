<script setup lang="ts">
import logo from "@/assets/icons/AbleLogo.svg?raw"
import User from "@/components/UI/User.vue";
import {useAuth} from "@/hooks/useAuth.ts";
import {useProjectsStore} from "@/stores/projects.ts";

const {logOut} = useAuth();
const store = useProjectsStore();

const selectVals = [
  {
    name: "Название 1",
    value: '11111111'
  },

  {
    name: "Название 2",
    value: '22222222'
  }
];

</script>

<template>
  <header class="header">

    <div class="header__left">
      <router-link to="/" class="logo">
        <v-icon :icon="logo" class="icon"/>
        Able <span class="id">ID</span>
      </router-link>
    </div>

    <div class="header__right">
      <v-select
        v-model="store.activeProject"
        placeholder="Выберите проект"
        :options="selectVals"
        @change="store.setActiveProject"
      />

      <User name="Test User" @user-clicked="logOut"/>
    </div>

  </header>
</template>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  &__left {
    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      font: var(--font-logo);
      color: var(--primary-color);
      .icon {
        margin-right: .8rem;
      }
      .id {
        color: var(--logo-color);
      }
    }
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    gap: 2.4rem;
    :deep(select) {
      font: var(--font-m);
      background: var(--bg-10);
      padding: .8rem 1.2rem;
      min-width: 20rem;
    }
  }
}
</style>