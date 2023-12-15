<script setup lang="ts">
import {computed} from "vue";
const props = defineProps<{
  value: number,
  increase: boolean,
}>()
const type = computed(() => props.increase ? 'percent--increase' : 'percent--decrease')
const arrow = computed(() => props.increase ? '+' : '-')
</script>

<template>
  <div :class="['percent', `${type}`]">
    {{`${arrow} ${value}%`}}
  </div>
</template>

<style scoped lang="scss">
.percent {
  &--increase {
    --color: var(--increaseColor);
  }
  &--decrease {
    --color: var(--decreaseColor);
  }
  min-width: 4.5rem;
  border: 1px solid var(--color);
  color: var(--color);
  padding: 0.6rem;
  border-radius: 50px;
}
</style>