<script setup lang="ts"></script>

<template>
  <div class="page-404">
    <h1> У вас недостаточно прав для посещения данной страницы </h1>
    <router-link class="back" to="/">
      Back to main
    </router-link>
  </div>
</template>


<style lang="scss" scoped>
.page-404 {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}

.back {
  font-size: 2rem;
  text-decoration: none;
}
</style>