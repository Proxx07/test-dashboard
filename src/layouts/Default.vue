<script setup lang="ts">
//import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";

// Auth checking
</script>

<template>
  <div class="app-inner">
    <div class="sidebar">
      <Navigation/>
    </div>

    <div class="site-content">
      <main>
        <slot/>
      </main>

    </div>
  </div>
</template>


<style scoped>
.app-inner {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(200px, 200px) auto;
  max-width: 1470px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>