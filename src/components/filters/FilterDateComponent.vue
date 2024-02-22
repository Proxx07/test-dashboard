<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import {filterDateTypes} from "@/models/staticContent/mainPageContent.ts";
import {IFilterDate} from "@/models/interfaces/mainPageInterfaces.ts";

const props = defineProps<{
  date: [string, string]
}>();

const emit = defineEmits<{
  (e: 'update:date', value: [string, string]): void
  (e: 'filterChanged'): void
}>()
const dateHandler = (item: [string, string]) => {
  emit('update:date', item)
  emit('filterChanged')
}

const isActive = (item: IFilterDate): boolean => props.date[0] === item.value[0] && props.date[1] === item.value[1]
</script>

<template>
  <div class="filter">
    <v-button
      v-for="item in filterDateTypes"
      :class="['date-button', isActive(item) && 'active']"
      :key="item.value.join('-')"
      @click="dateHandler(item.value)"
    >
      {{ item.name }}
    </v-button>

    <div class="calendar">
      <vue-date-picker
        v-model="props.date"
        :enable-time-picker="false"
        :clearable="false"
        :month-change-on-scroll="true"
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
}

.calendar {
  margin-left: -1px;
}

.date-button {
  border-radius: 0;
  border-top: 1px solid var(--bg-2);
  border-right: 1px solid var(--bg-2);
  border-bottom: 1px solid var(--bg-2);
  background: transparent;
  color: var(--secondary-color);
  &:first-child {
    border-left: 1px solid var(--bg-2);
    border-radius: var(--radius-s) 0 0 var(--radius-s);
  }

  &.active {
    background: var(--primary-color);
    color: var(--dark-color);
  }

  &:not(.active):hover {
    color: var(--primary-color);
  }
}
</style>