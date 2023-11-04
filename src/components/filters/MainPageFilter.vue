<script setup lang="ts">
import {filterAppTypes, filterDateTypes} from "@/models/staticContent/mainPageContent.ts";
import {ref} from "vue";

const filter = ref({

})
</script>

<template>
<div class="main-filter">
  <div class="main-filter__devices">
    <span v-for="item in filterAppTypes" :key="item.value">
      {{item.name}}
    </span>
  </div>

  <div class="main-filter__dates">
    <v-button class="date-button" v-for="item in filterDateTypes" :key="item.value.join('')">
      {{item.name}}
    </v-button>

    <div class="calendar">
      DatePicker
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.main-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  border-bottom: 1px solid var(--LayoutBorderColor);
  &__devices {
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

  &__dates {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: -1px;
  }
}

.date-button {
  border-radius: 0;
  border-top: 1px solid var(--LayoutBorderColor);
  border-right: 1px solid var(--LayoutBorderColor);
  border-bottom: 1px solid var(--LayoutBorderColor);
  background: var(--white);
  &:first-child {
    border-left: 1px solid var(--LayoutBorderColor);
    border-radius: .4rem 0 0 .4rem;
  }

  &:hover {
    background: var(--VioletTransparent);
    color: var(--VioletText);
  }
}
</style>