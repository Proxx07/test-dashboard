<script setup lang="ts">
import Header from "@/components/Header.vue";
import {useProjects} from "@/hooks/useProjects.ts";
import VPagination from "@/components/VPagination.vue";
import Project from "@/components/Project.vue";

const {list, headerSubtitle} = useProjects()
</script>

<template>
  <Header title="Проекты" :subtitle="headerSubtitle"/>
  <main>
    <div class="projects-list" v-for="item in list" :key="item.name">
      <project :project="item" />
    </div>
  </main>

  <v-pagination :total-pages="0"/>
</template>

<style scoped>
.projects-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2.4rem;
}
</style>