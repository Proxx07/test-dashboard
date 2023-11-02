<script setup lang="ts">
interface HeaderProps {
  title: string,
  subtitle?: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  title: "",
  subtitle: ""
})

</script>

<template>
  <header class="header">
    <div class="header__left">
      <div class="site-name-wrapper">
        <span class="site-name"> Face ID </span>
      </div>

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
.site-name {
  color: var(--VioletText);
  font-size: 2.4rem;
  text-decoration: none;
  display: block;
  padding: 0 0 1.4rem;
}

.header {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 2.4rem;
  &__description {
    font-weight: 600;
    font-size: 1.5em;
    color: var(--TextColorGray)
  }

  &__left {
    display: grid;
    grid-gap: 1rem 0;
  }
}
</style>