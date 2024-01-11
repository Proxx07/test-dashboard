<script setup lang="ts">
const props = defineProps<{
  type?: 'circle' | 'line'
}>()
</script>

<template>
  <div :class="`loader ${props.type || 'circle'}`">
    <div class="inner"></div>
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

.loader {
  &.circle {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background: radial-gradient(farthest-side, currentColor 94%, #0000) top/9px 9px no-repeat, conic-gradient(#0000 30%, currentColor);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
    animation: circleLoader 1s infinite linear;
  }

  &.line {
    width: 100%;
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
}
</style>