<script setup lang="ts">
import icon from "@/assets/icons/logout.svg?raw";

const emit = defineEmits(['user-clicked'])
const props = defineProps<{
  name: string
}>()
</script>

<template>
  <div class="user" @click="emit('user-clicked')">
    <div class="user__name"> {{ props.name }} </div>

    <v-icon :icon="icon"/>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0;
  gap: 1.2rem;
  color: var(--primary-color);
  transition: var(--transition-slow);
  &__name {
    color: var(--secondary-color);
    font: var(--font-m-m);
  }
  &:hover {
    color: var(--primary-color);
  }
}
</style>