<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  type?: 'circle' | 'line' | 'dots'
  size?: 'medium' | 'small'
}>()

const loaderWeight = computed(() => props.size === 'small' ? '.5rem' : '.9rem');
const loaderType = computed(() => props.type || 'circle');
</script>

<template>
  <div class="loader" :class="loaderType" :style="{'--sz': loaderWeight}">
    <div class="inner">
      <span v-if="type === 'dots'" v-for="i in 3" class="dot" :style="{'--delay': `${i * 0.1}s`}" :key="i"/>
      &nbsp;
    </div>
  </div>
</template>

<style scoped>
@keyframes circleLoader {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes lineLoader {
  0% {
    left: 0;
    right: 100%;
  }
  50% {
    left: 0;
    right: 0;
  }
  100% {
    right: 0;
    left: 100%;
  }
}

@keyframes dottedLoader {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

.loader {
  &.circle {
    width: 100%;
    height: 100%;
    max-width: 6rem;
    max-height: 6rem;

    border-radius: 50%;
    background: radial-gradient(farthest-side, currentColor 94%, #0000) top/var(--sz) var(--sz) no-repeat, conic-gradient(#0000 30%, currentColor);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--sz)), #000 0);
    animation: circleLoader 1s infinite linear;
  }
  &.line {
    max-width: 100%;
    min-height: .2rem;
    margin: 0 .2rem;
    position: relative;
    border-radius: var(--radius-s);
    overflow: hidden;
    .inner {
      position: absolute;
      top: 0;
      bottom: 0;
      background: currentColor;
      animation: lineLoader 1.5s ease-in-out infinite;
    }
  }
  &.dots {
    .inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      .dot {
        width: .5rem;
        height: .5rem;
        background: currentColor;
        border-radius: 50%;
        animation: dottedLoader .5s ease-in-out var(--delay) infinite;
      }
    }
  }
}
</style>