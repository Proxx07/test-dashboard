<script setup lang="ts">
const props = defineProps<{
  type: 'positive' | 'negative'
  icon?: string
  noBg?: boolean
}>();
</script>

<template>
  <div class="status" :class="[props.type, !noBg && 'with-bg']">
    <v-icon v-if="icon" class="icon" :icon="props.icon"/>
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.status {
  display: inline-flex;
  align-items: center;
  padding: .4rem .8rem;
  border-radius: 10rem;
  position: relative;
  overflow: hidden;
  font: var(--font-xs-m);
  color: var(--status-color);
  &.positive {
    --status-color: var(--positive);
  }

  &.negative {
    --status-color: var(--negative);
  }

  &.with-bg:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background: var(--status-color);
  }
}

.icon {
  margin-right: .2rem;
}
</style>