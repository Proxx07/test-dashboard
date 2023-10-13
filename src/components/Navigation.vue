<script setup lang="ts">
import {navigation} from "@/models/staticContent/navigation.ts";
</script>

<template>
  <nav class="navigation">

    <div class="site-name-wrapper">
        <span class="site-name"> Face ID </span>
    </div>

    <ul class="navigation__menu">
      <li class="navigation__menu-item" v-for="item in navigation" :key="item.link">
        <router-link :to="item.link" class="navigation__menu-item-link">
          <span> {{item.name}} </span>
        </router-link>
      </li>
    </ul>

    <div class="empty"></div>

    <div class="navigation__menu-item">
      <span class="navigation__menu-item-link">Выйти</span>
    </div>
  </nav>
</template>

<style lang="scss">
.site-name {
  color: var(--VioletText);
  font-size: 2.4rem;
  text-decoration: none;
  display: block;
  padding: 4px 0;
}

.navigation {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 64px;
  &__menu {
    list-style: none;
    gap: 12px 0;
    display: flex;
    flex-direction: column;
    &-item {
      &-link {
        padding: 10px 0;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--AccentColor);
        font-size: 1.5rem;
        transition: all 0.3s;
        cursor: pointer;
        &:hover,
        &.router-link-active {
          color: var(--VioletText)
        }
      }
    }
  }
}
</style>