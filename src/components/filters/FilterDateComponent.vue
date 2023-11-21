<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import {filterDateTypes} from "@/models/staticContent/mainPageContent.ts";
import {IDate} from "@/models/interfaces/mainPageInterfaces.ts";


const props = defineProps<IDate>();
const emit = defineEmits<{
  (e: 'update:fromDate', value: string): void
  (e: 'update:toDate', value: string): void
  (e: 'filterChanged'): void
}>()
const dateHandler = (item: string[]) => {
  emit('update:fromDate', item[0])
  emit('update:toDate', item[1])
  emit('filterChanged')
}
</script>

<template>
  <div class="filter">
    <v-button
      v-for="item in filterDateTypes"
      :key="item.value.join('-')"
      :class="{'active': props.fromDate === item.value[0] && props.toDate === item.value[1]}"
      class="date-button"
      @click="dateHandler(item.value)"
    >
      {{ item.name }}
    </v-button>

    <div class="calendar">
      <vue-date-picker
        :model-value="[props.fromDate, props.toDate]"
        :enable-time-picker="false"
        :clearable="false"
        :month-change-on-scroll="false"
        locale="ru"
        model-type="yyyy-MM-dd"
        range no-today auto-apply
        @update:model-value="dateHandler"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: -1px;
}

.calendar {
  margin-left: -1px;
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

  &:hover,
  &.active {
    background: var(--VioletTransparent);
    color: var(--VioletText);
  }
}
</style>