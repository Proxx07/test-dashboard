<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app-inner">
    <Header/>
    <div class="site-content">
      <slot/>
    </div>
    <Footer/>

    <div id="confirmations-wrapper"></div>
  </div>
</template>


<style scoped lang="scss">
.app-inner {
  max-height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
}
</style>