<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import {useBurger} from "@/hooks/useBurger.ts";
const {burgerClosed, toggleBurger} = useBurger();

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
  --width: 21.5rem;

  display: grid;
  grid-template-columns: minmax(var(--width), var(--width)) calc(100% - var(--width));
  max-width: 100%;
  margin: 0 auto;
  transition: all .3s;
  min-height: 100vh;
  max-height: 100vh;
}

.sidebar {
  padding: 2rem 2.4rem 2.2rem 2.4rem;
  border-right: 1px solid var(--LayoutBorderColor);
  width: 100%;
  overflow: hidden;
  transition: ease-in-out .3s;
}

.site-content {
  padding: 2.2rem 2.4rem 2.4rem;
  overflow: auto;
  max-height: 100vh;
}

.app-inner--burger-closed {
  --width: 7.5rem;

  .sidebar {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  .navigation__menu-item-link {
    font-size: 0;
    &.burger-button {
      .icon {
        transform: rotateZ(-90deg);
        svg {
          transform: rotateZ(90deg);
        }
      }
    }
  }
}
</style>