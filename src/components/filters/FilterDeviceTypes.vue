<script setup lang="ts">
import {filterAppTypes} from "@/models/staticContent/mainPageContent.ts";

</script>

<template>
  <div class="devices">
      <span v-for="item in filterAppTypes" :key="item.value">
        {{ item.name }}
      </span>
  </div>
</template>

<style scoped lang="scss">
.devices {
  font: var(--font-m-m);
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  span {
    display: inline-block;
    padding: .8rem 0 .7rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: var(--transition-fast);

    &:hover, &.active {
      border-bottom-color: var(--primary-color);
    }
  }
}
</style>