<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import FilterDeviceTypes from "@/components/filters/FilterDeviceTypes.vue";
import FilterDateComponent from "@/components/filters/FilterDateComponent.vue";

const props = defineProps<{
  heading: string

  date?: [string, string]
  device?: string
  searchQuery?: string
  isLoading?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:date', value: [string, string]): void
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

const dateFromTo = computed({
  get(): [string, string] {
    return props.date || ["", ""];
  },

  set(value: [string, string]) {
    emit('update:date', value)
  }
});

/*
const device = computed({
  get(): string {
    return props.device || ""
  },

  set(value: string) {
    emit('update:device', value)
  }
})
*/
</script>

<template>
  <div :class="['wrapper', isLoading && 'disabled']" ref="wrapper" :style="{'--cols': columns}">

    <div class="wrapper__left">
      <h1> {{ heading }} </h1>

      <v-input v-if="props.searchQuery !== undefined" v-model="search" placeholder="Поиск" class="interaction-element"/>
    </div>

    <div v-if="props.device !== undefined" class="wrapper__middle interaction-element">
      <filter-device-types/>
    </div>

    <div v-if="props.date !== undefined" class="wrapper__right interaction-element">
      <filter-date-component
        v-model:date="dateFromTo"
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

  &.disabled {
    pointer-events: none;
    user-select: none;
    .interaction-element {
      opacity: 0.8;
      transition: var(--transition-fast);
    }
  }

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