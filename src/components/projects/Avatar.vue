<script setup lang="ts">
import {IAvatar} from "@/models/interfaces/projectsIntefaces.ts";
import {computed} from "vue";
const props = defineProps<IAvatar>();
const chipType = computed(() => props.status ? 'positive' : 'negative')
</script>

<template>
  <div class="avatar">
    <div class="logo">
      <img v-if="logo" :src="logo" :alt="name">
      <span v-else> Logo </span>
    </div>

    <div class="details">
      <div class="name"> {{name}} </div>
      <v-chip :type="chipType">
        {{status ? "Активный" : "Отключен"}}
      </v-chip>
      </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  display: flex;
  gap: 1.6rem;
  .logo {
    min-width: 5.8rem;
    min-height: 5.8rem;
    border: 1px solid var(--secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    span {
      font: var(--font-s);
      text-transform: uppercase;
      line-height: 1;
      font-size: .8rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .details {
    flex-grow: 1;
  }

  .name {
    font: var(--font-xm);
    padding-bottom: .6rem;
  }
}
</style>