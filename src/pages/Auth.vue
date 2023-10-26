<script setup lang="ts">
import AuthorizationForm from "@/components/AuthorizationForm.vue";
</script>

<template>
  <div class="wrapper">
    <AuthorizationForm/>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>