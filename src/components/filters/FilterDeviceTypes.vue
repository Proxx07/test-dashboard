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
  font-size: 1.5rem;
  line-height: 1.3;
  display: flex;
  gap: 2.4rem;
  margin-bottom: -1px;

  span {
    display: inline-block;
    padding: .8rem 0;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;

    &:hover, &.active {
      border-bottom-color: var(--VioletText);
    }
  }
}
</style>