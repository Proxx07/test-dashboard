<script setup lang="ts">
const isDev = import.meta.env.MODE === 'development'
</script>

<template>
  <div v-if="isDev" class="copyright">
    OOO "THE ABLE TECHNOLOGIES" <br>
    ABLE ID ver 2.0 <br>
    Республика Узбекистан
  </div>
</template>

<style scoped lang="scss">
.copyright {
  padding: 1rem;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
}
</style>