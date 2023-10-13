<script setup lang="ts">
import {navigation} from "@/models/staticContent/navigation.ts";
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__menu">
      <li class="navigation__menu-item" v-for="item in navigation" :key="item.link">
        <router-link :to="item.link">
          <span> {{item.name}} </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>