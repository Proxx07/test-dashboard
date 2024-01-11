<script setup lang="ts">
import {navigation} from "@/models/staticContent/navigation.ts";
import {checkUserAccess} from "@/utils/roles.ts";
import VIcon from "@/components/UI/VIcon.vue";
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__menu">
      <template v-for="item in navigation" :key="item.link">
        <li v-if="checkUserAccess(item.access)">
          <router-link :to="item.link" class="navigation__menu-link">
            <v-icon v-if="item.icon" :icon="item.icon" class="icon"/>
            <span> {{item.name}} </span>
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  background: var(--bg-10);
  backdrop-filter: blur(10px);
  border-radius: 10rem;
  &__menu {
    display: flex;
    list-style: none;
    &-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .4rem;
      padding: 1.3rem 2.4rem;
      text-decoration: none;
      min-width: 15rem;

      font: var(--font-xs);
      color: var(--secondary-color);
      transition: var(--transition-slow);

      &.router-link-exact-active {
        color: var(--primary-color);
        .icon {
          color: var(--accent);
        }
      }
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>