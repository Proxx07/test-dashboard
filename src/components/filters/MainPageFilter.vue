<script setup lang="ts">
import {filterAppTypes, filterDateTypes} from "@/models/staticContent/mainPageContent.ts";
import {IFilter} from "@/models/interfaces/mainPageInterfaces.ts";
import VueDatePicker from "@vuepic/vue-datepicker";
import {validDate} from "@/utils/scripts.ts";

//@ts-ignore
const props = defineProps<IFilter>();

const emit = defineEmits<{
  (e: 'update:fromDate', from: string): void
  (e: 'update:toDate', to: string): void
  (e: 'filterChanged'): void
}>()
const dateHandler = (item: string | string[]) => {
  if (!Array.isArray(item)) {
    emit('update:fromDate', item)
    emit('update:toDate', item)
  } else {
    emit('update:fromDate', item[0])
    emit('update:toDate', item[1])
  }
  emit('filterChanged')
}

const datepickerHandler = (date: Date, isEnd: boolean = false) => {

  if (!isEnd) {
    emit('update:fromDate', validDate(date))
    return
  }

  emit('update:toDate', validDate(date))
  emit('filterChanged')
}
</script>

<template>
<div class="main-filter">
  <div class="main-filter__devices">
    <span v-for="item in filterAppTypes" :key="item.value">
      {{item.name}}
    </span>
  </div>

  <div class="main-filter__dates">
    <v-button class="date-button" v-for="item in filterDateTypes" :key="item.value" @click="dateHandler(item.value)">
      {{item.name}}
    </v-button>

    <div class="calendar">
      <VueDatePicker
        :enable-time-picker="false"
        :clearable="false"
        range no-today auto-apply
        @range-start="datepickerHandler($event)"
        @range-end="datepickerHandler($event, true)"
      />
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

  .calendar {
    margin-left: -1px;
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