<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
}>()

</script>

<template>
  <button :disabled="props.disabled">
    <slot/>
  </button>
</template>

<style scoped>
  button {
    padding: 1.2rem;
  }
</style>