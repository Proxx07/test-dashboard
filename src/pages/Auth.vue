<script setup lang="ts">
import logo from "@/assets/icons/logo-with-text.svg?raw";
import AuthorizationForm from "@/components/AuthorizationForm.vue";
</script>

<template>
  <div class="wrapper">
    <v-icon :icon="logo"/>
    <authorization-form/>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 3.2rem;
}
</style>