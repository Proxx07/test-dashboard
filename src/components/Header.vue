<script setup lang="ts">
interface HeaderProps {
  title: string,
  subtitle: string,
  hasSelect: boolean
}

const props = withDefaults(defineProps<HeaderProps>(), {
  title: "",
  subtitle: "3 443 пользователей",
  hasSelect: true
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

    <div class="header__right" v-if="props.hasSelect"></div>

  </header>
</template>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-gap: 0 24px;

  &__description {
    font-weight: 600;
    font-size: 1.5em;
    color: var(--TextColorGray)
  }

  &__left {
    display: grid;
    grid-gap: 10px 0;
  }

  &__right {
    display: grid;
    align-content: center;
    justify-content: end;
  }
}
</style>