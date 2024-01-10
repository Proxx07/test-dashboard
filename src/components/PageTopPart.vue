<script setup lang="ts">
import {onMounted, ref} from "vue";

import FilterDeviceTypes from "@/components/filters/FilterDeviceTypes.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";
import VInput from "@/components/UI/VInput.vue";

const props = defineProps<{
  heading: string

  fromDate?: string
  toDate?: string
  device?: string
  searchQuery?: string
}>();

const emit = defineEmits<{
  (e: 'update:fromDate', value: string): void
  (e: 'update:toDate', value: string): void
  (e: 'filterChanged'): void

  (e: 'update:searchQuery', value: string): void
}>();

const wrapper = ref();
const columns = ref<number>(1)
onMounted(() => {
  columns.value = wrapper.value.querySelectorAll(':scope > div').length || 1;
})

</script>

<template>
  <div class="wrapper" ref="wrapper" :style="{'--cols': columns}">
    <div class="wrapper__left">
      <h1> {{ heading }} </h1>

      <v-input
        v-model="props.searchQuery"
        placeholder="Поиск"
        @update:modelValue="emit('update:searchQuery', $event)"
      />
    </div>
    <div class="wrapper__middle" v-if="!props.device">
      <filter-device-types/>
    </div>
    <div class="wrapper__right" v-if="props.fromDate || props.toDate">
      <filter-date-component
        v-model:from-date="props.fromDate"
        v-model:to-date="props.toDate"
        @update:from-date="emit('update:fromDate', $event)"
        @update:to-date="emit('update:toDate', $event)"
        @filter-changed="emit('filterChanged')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.wrapper {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  gap: 2.4rem;

  &__left {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    h1 {
      font: var(--font-l);
    }

    :deep(label) {
      flex-grow: 1;
    }
  }
}
</style>