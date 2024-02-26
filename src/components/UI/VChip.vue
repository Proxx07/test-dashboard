<script setup lang="ts">
import up from "@/assets/icons/arrow-up.svg?raw";
import down from "@/assets/icons/arrow-down.svg?raw";
import {computed} from "vue";

const props = defineProps<{
  type: 'positive' | 'negative'
  icon?: boolean
  noBg?: boolean
}>();

const iconType = computed<string>(() => props.type === 'positive' ? up : down);

</script>

<template>
  <div class="status" :class="[props.type, !noBg && 'with-bg']">
    <v-icon v-if="icon" class="icon" :icon="iconType"/>
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