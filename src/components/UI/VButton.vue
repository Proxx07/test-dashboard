<script lang="ts">
export default {
  name: "v-button",
}
</script>

<template>
  <button class="button">
    <span> <slot/> </span>
  </button>
</template>

<style scoped lang="scss">
.button {
  background: var(--bg);
  color: var(--cl);
  border: 1px solid var(--bd);
  border-radius: var(--radius-s);
  cursor: pointer;
  padding: .8rem 2rem .7rem;
  font: var(--font-m-m);
  &.primary {
    --bg: var(--accent);
    --cl: var(--primary-color);
    --bd: transparent;
    &-blank {
      --bg: transparent;
      --cl: var(--accent);
      --bd: var(--accent);
    }
  }

  &.secondary {
    --bg: var(--primary-color);
    --cl: var(--dark-color);
    --bd: transparent;
    &-blank {
      --bg: transparent;
      --cl: var(--primary-color);
      --bd: var(--primary-color);
    }
  }

  &.large {
    min-height: 5rem;
  }
}

.button {
  position: relative;
  overflow: hidden;
  --pseudo-opacity: 0;
  span {
    position: relative;
  }
  &:before {
    content: '';
    position: absolute;
    inset: -1px;
    transition: var(--transition-slow);
    background: var(--bg-10);
    opacity: var(--pseudo-opacity);
    pointer-events: none;
  }
  &:hover {
    --pseudo-opacity: 1;
  }
}
</style>