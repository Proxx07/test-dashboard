<script setup lang="ts">
import AuthorizationForm from "@/components/AuthorizationForm.vue";
import AbleLogo from "@/components/AbleLogo.vue";
</script>

<template>
  <div class="wrapper">
    <able-logo class="large"/>
    <div class="form-wrapper">
      <authorization-form/>
      <div class="copyright-able">
        The Able Technologies
      </div>
    </div>
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

.form-wrapper {
  max-width: 43rem;
  width: 100%;
  margin: 0 auto;
}

.copyright-able {
  padding: 1.2rem 0;
  font: var(--font-xs);
  text-align: left;
}
</style>