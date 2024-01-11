<script setup lang="ts">
import Project from "@/components/Project.vue";
import {useProjects} from "@/hooks/useProjects.ts";
import PageTopPart from "@/components/PageTopPart.vue";

const { list } = useProjects()
</script>

<template>
  <page-top-part heading="Проекты"/>
  <main class="projects-list">
      <project v-for="item in list" :project="item" :key="item.name"/>
  </main>
</template>

<style scoped>
.projects-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2.4rem;
}
</style>