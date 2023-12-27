<script setup lang="ts">
import arrow from '@/assets/icons/asc-desc-arrow.svg?raw';

import {computed} from "vue";
const props = defineProps<{
  value: number | string,
  increase?: boolean,
}>()
const type = computed(() => props.increase ? 'percent--increase' : 'percent--decrease')
</script>

<template>
  <div :class="['percent', `${type}`]">
    <span v-html="arrow"/>
    {{`${value}%`}}
  </div>
</template>

<style scoped lang="scss">
.percent {
  &--increase {
    --color: var(--increaseColor);
    --rotate: 0deg;
  }
  &--decrease {
    --color: var(--decreaseColor);
    --rotate: 180deg;
  }
  min-width: 4.5rem;
  border: 1px solid var(--color);
  color: var(--color);
  padding: 0.6rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: .2rem;
  font-size: 1rem;
  span {
    transform: rotate(var(--rotate));
    font-size: 0;
    :deep(svg path) {
      fill: var(--color);
    }
  }
}
</style>