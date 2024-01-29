<script setup lang="ts">
import logo from "@/assets/icons/AbleLogo.svg?raw"
</script>

<template>
  <div class="logo">
    <v-icon :icon="logo" class="icon no-fill"/>
    Able <span class="id">ID</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  --width: 2.6rem;
  --height: 2.6rem;
  --space: .8rem;
  --font: var(--font-logo);

  &.large {
    --width: 5.8rem;
    --height: 5.8rem;
    --space: 1.2rem;
    --font: var(--font-xl);
    font-size: 5rem;
  }

  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font: var(--font);
  .icon {
    margin-right: var(--space);
    width: var(--width);
    height: var(--height);
    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
  .id {
    color: var(--logo-color);
  }
}
</style>