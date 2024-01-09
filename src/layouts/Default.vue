<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import Header from "@/components/Header.vue";

</script>

<template>
  <div class="app-inner">
    <Header/>
    <div class="site-content">
      <slot/>
    </div>

    <footer class="footer">
      <Navigation/>
    </footer>
  </div>
</template>


<style lang="scss">
.app-inner {
  min-height: 100vh;
  padding: 2.4rem;
}
</style>