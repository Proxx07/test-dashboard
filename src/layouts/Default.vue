<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import {useAuth} from "@/hooks/useAuth.ts";
import {useBurger} from "@/hooks/useBurger.ts";

const {checkUser} = useAuth();
const {burgerClosed, toggleBurger} = useBurger();

checkUser()
</script>

<template>
  <div class="app-inner" :class="{'app-inner--burger-closed': burgerClosed}">
    <aside class="sidebar">
      <Navigation :burger-closed="burgerClosed" @burger-click="toggleBurger"/>
    </aside>

    <div class="site-content">
      <slot/>
    </div>
  </div>
</template>


<style lang="scss">
.app-inner {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(21.5rem, 21.5rem) auto;
  max-width: 1440px;
  margin: 0 auto;
  transition: all .3s;
}

.sidebar {
  padding: 2rem 1.1rem 2.2rem 3.7rem;
  border-right: 1px solid var(--LayoutBorderColor);
  width: 100%;
  overflow: hidden;
  transition: ease-in-out .3s;
}

.site-content {
  padding: 2.2rem 2.4rem 2.4rem;
}

.app-inner--burger-closed {
  grid-template-columns: minmax(7.5rem, 7.5rem) auto;
  .sidebar {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  .navigation__menu-item-link {
    font-size: 0;
    &.burger-button {
      .icon {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>