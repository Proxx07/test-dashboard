<script setup lang="ts">
import {IMockProject} from "@/models/interfaces/projectsIntefaces.ts";
import Avatar from "@/components/projects/Avatar.vue";

const props = defineProps<{
  project: IMockProject
}>();

const emit = defineEmits<{
  (e: 'preview', value: IMockProject): void
  (e: 'edit', value: IMockProject): void
}>()

</script>

<template>
  <div class="project">
    <avatar :name="project.name" :logo="project.logo" :status="project.status"/>

    <div class="project__id">
      ID: {{props.project.id}}
    </div>

    <div class="project__buttons">
      <v-button class="secondary-blank" @click="emit('preview', project)">
        Посмотреть
      </v-button>

      <v-button class="primary-blank" @click="emit('edit', project)">
        Редактировать
      </v-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  background: var(--form-bg);
  padding: 2rem;
  border-radius: var(--radius-m);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  &__id {
    font: var(--font-m-m);
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>