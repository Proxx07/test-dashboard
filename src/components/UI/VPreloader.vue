<script setup lang="ts">

</script>

<template>
  <div class="loader">
    <div class="loader__inner"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--Violet) 94%, #0000) top/9px 9px no-repeat, conic-gradient(#0000 30%, var(--Violet));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: lodaerAnimation 1s infinite linear;
}

@keyframes lodaerAnimation {
  100% {
    transform: rotate(1turn);
  }
}
</style>