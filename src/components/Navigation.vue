<script setup lang="ts">
import {navigation} from "@/models/staticContent/navigation.ts";
//import burgerIcon from "@/assets/icons/burger.svg?raw";

import {useAuth} from "@/hooks/useAuth.ts";
const {logOut} = useAuth()
</script>

<template>
  <nav class="navigation">
    <div class="navigation__menu-item">
      <!--
      <span class="navigation__menu-item-link" @click="toggleBurger">
        <span class="icon" v-html="burgerIcon"/>
      </span>
      -->
    </div>

    <ul class="navigation__menu">
      <li class="navigation__menu-item" v-for="item in navigation" :key="item.link">
        <router-link :to="item.link" class="navigation__menu-item-link">
          <span v-if="item.icon" v-html="item.icon" class="icon" />
          {{item.name}}
        </router-link>
      </li>
    </ul>

    <div class="empty"></div>

    <div class="navigation__menu-item">
      <span class="navigation__menu-item-link" @click="logOut">
        Выйти
      </span>
    </div>
  </nav>
</template>

<style lang="scss">

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
        svg path {
          transition: all 0.3s;
        }

        &:hover,
        &.router-link-active {
          color: var(--VioletText);
          svg path {
            fill: var(--VioletText);
          }
        }
      }
    }
  }
}
</style>