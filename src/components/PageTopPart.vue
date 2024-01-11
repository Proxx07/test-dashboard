<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import FilterDeviceTypes from "@/components/filters/FilterDeviceTypes.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";

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
  (e: 'update:searchQuery', value: string): void
  (e: 'update:device', value: string): void
  (e: 'filterChanged'): void
}>();

const wrapper = ref();
const columns = ref<number>(1)
onMounted(() => {
  columns.value = wrapper.value.querySelectorAll(':scope > div').length || 1;
})

const search = computed({
  get() {
    return props.searchQuery ||  ""
  },
  set(value) {
    emit('update:searchQuery', value)
  }
});

// todo make smarter with array of dates
const dateFrom = computed({
  get(){
    return props.fromDate || ""
  },
  set(value) {
    emit('update:fromDate', value)
  }
});

const dateTo = computed({
  get(){
    return props.toDate || ""
  },
  set(value) {
    emit('update:toDate', value)
  }
});
</script>

<template>
  <div class="wrapper" ref="wrapper" :style="{'--cols': columns}">

    <div class="wrapper__left">
      <h1> {{ heading }} </h1>

      <v-input v-if="props.searchQuery !== undefined" v-model="search" placeholder="Поиск" />
    </div>

    <div v-if="props.device !== undefined" class="wrapper__middle">
      <filter-device-types/>
    </div>

    <div v-if="props.fromDate !== undefined" class="wrapper__right">
      <filter-date-component
        v-model:from-date="dateFrom"
        v-model:to-date="dateTo"
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
  padding-bottom: 1rem;
  &__left {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    h1 {
      font: var(--font-l);
    }

    :deep(label) {
      flex-grow: 1;
      height: 100%;
      max-width: 32rem;
      input {
        min-height: 0;
        font: var(--font-m);
        padding: .8rem 1.2rem;
      }
    }
  }
}
</style>