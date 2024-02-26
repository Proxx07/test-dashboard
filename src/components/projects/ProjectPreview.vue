<script setup lang="ts">
import {IMockProject} from "@/models/interfaces/projectsIntefaces.ts";
import Avatar from "@/components/projects/Avatar.vue";
import {projectDetails} from "@/models/staticContent/projectContent.ts";

const props = defineProps<{
  project: IMockProject
}>()
</script>

<template>
  <div class="project" v-if="props.project.id">
    <avatar :name="project.name" :logo="project.logo" :status="project.status"/>

    <div class="details-list">
      <div class="detail" v-for="item in projectDetails" :key="item.value">
        <div class="detail__title">
          {{item.name}}
        </div>

        <div class="detail__body" v-if="item.value !== 'status'">

          <template v-if="project[item.value]?.includes('http')">
            <a :href="project[item.value]" target="_blank" rel="nofollow">
              {{ project[item.value]?.toString().replace(/^https?:\/\//, '') }}
            </a>
          </template>

          <template v-else>
            {{ project[item.value] || "-" }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4rem;
  padding-top: 1.8rem;
}
.details-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  min-width: 72rem;
  .detail {
    &__title {
      font: var(--font-m);
      color: var(--secondary-color);
    }

    &__body {
      font: var(--font-xm);
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>