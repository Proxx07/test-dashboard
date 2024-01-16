<script setup lang="ts">
import {computed, useSlots} from "vue";

const props = defineProps<{
  title: string,
  description: string | string[],
}>()

const emit = defineEmits<{
  (e: 'accept'): void
  (e: 'reject'): void
}>();

const descriptionResult = computed(() => {
  return Array.isArray(props.description) ? props.description.join('<br>') : props.description
})

</script>

<template>
<div class="confirmation">

  <div class="confirmation__title">
    {{title}}
  </div>

  <div class="confirmation__body" v-html="descriptionResult"/>

  <div class="confirmation__buttons">

    <slot>
      <v-button class="primary" @click="emit('accept')"> Да </v-button>
      <v-button class="secondary" @click="emit('reject')"> Нет </v-button>
    </slot>

  </div>

</div>
</template>

<style scoped lang="scss">
.confirmation {
  font: var(--font-xm);
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: 1.6rem;
  max-width: 50rem;
  &__title {
    font-size: 2.4rem;
  }

  &__buttons {
    padding-top: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    :deep(button) {
      flex-grow: 1;
    }
  }
}
</style>