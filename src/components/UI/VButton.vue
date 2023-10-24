<script lang="ts">
export default {
  name: "v-button"
}
</script>

<template>
  <button class="button">
    <slot/>
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid transparent;
  &.primary {
    background: var(--Violet);
    color: var(--white);
  }

  &.transparent {
    background: var(--VioletTransparent);
    color: var(--VioletText);
  }

  &.secondary {
    background: none;
    border-color: var(--Violet);
    color: var(--VioletText);
  }
}
</style>