<script setup lang="ts">
interface HeaderProps {
  title: string,
  subtitle: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  title: "",
  subtitle: ""
})

</script>

<template>
  <header class="header">
    <div class="header__left">

      <h1 class="header__title">
        {{props.title}}
      </h1>

      <div class="header__description" v-if="props.subtitle">
        {{props.subtitle}}
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 2.4rem;
  min-height: 14.2rem;
  &__description {
    font-weight: 600;
    font-size: 1.5em;
    color: var(--TextColorGray)
  }

  &__left {
    display: grid;
    grid-gap: 10px 0;
  }
}
</style>