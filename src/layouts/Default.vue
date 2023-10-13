<script setup lang="ts">
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


<style>
.app-inner {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(200px, 200px) auto;
  max-width: 1440px;
  margin: 0 auto;
}

.sidebar {
  padding: 20px 15px 20px 32px;
  border-right: 1px solid var(--LayoutBorderColor);
  width: 100%;
}

.site-content {
  padding: 32px;
}
</style>