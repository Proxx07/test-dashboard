<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <footer class="footer">
    <Navigation/>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  padding: 8rem 0 5rem;
  background: linear-gradient(180deg, rgba(16, 17, 25, 0) 0%, #101119 100%);
}
</style>