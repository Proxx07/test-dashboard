<script setup lang="ts">
import Project from "@/components/projects/Project.vue";
import {useProjects, useProject} from "@/composables/useProjects.ts";
import PageTopPart from "@/components/PageTopPart.vue";
import PopupModal from "@/components/UI/PopupModal.vue";
import ProjectPreview from "@/components/projects/ProjectPreview.vue";

const { list } = useProjects();
const {activeProject, isPreviewOpened, previewHandler, editHandler} = useProject();

</script>

<template>
  <page-top-part heading="Проекты"/>
  <main class="projects-list">
    <project v-for="item in list" :project="item" :key="item.id" @preview="previewHandler" @edit="editHandler"/>
  </main>

  <popup-modal v-model="isPreviewOpened" :title="`ID: ${activeProject.id}`">
    <project-preview :project="activeProject"/>
  </popup-modal>
</template>

<style scoped>
.projects-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2.4rem;
}
</style>