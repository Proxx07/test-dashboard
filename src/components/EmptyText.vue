<template>
  <div class="empty-text">
    <slot>
      Пусто... <span class="smile">&#128511;</span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.empty-text {
  font-size: 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.smile {
  font-size: 2.5rem;
}
</style>