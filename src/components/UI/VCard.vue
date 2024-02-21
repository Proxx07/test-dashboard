<script lang="ts">
export default {
  name: "v-card",
}
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background: var(--bg-5);
  border-radius: var(--radius-m);
  padding-bottom: 1.4rem;
}
</style>