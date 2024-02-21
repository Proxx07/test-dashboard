<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const props = defineProps<{
  colors: string[]
  series: Array<string | number>
  categories: string[]
  borders?: boolean
  loading?: boolean
  activeCharts?: string[]
}>();

const emit = defineEmits<{
  (e: 'itemClick', value: string): void
}>()

const statsWrapper = ref<null | HTMLElement>();
const wrapperWidth = ref<number>(0);
const itemsCount = computed(() => wrapperWidth.value < 320 ? 1 : props.series.length !== 3 ? 2 : 3);
const clickHandler = (value: string) => {
  emit('itemClick', value)
}
onMounted(() => {
  wrapperWidth.value = statsWrapper.value?.offsetWidth ?? 0;
})
</script>

<template>
  <div class="stats" ref="statsWrapper" :style="{
    '--itemsCount': itemsCount,
    '--border-color': props.borders ? 'var(--bg-10)' : 'transparent',
    '--vertical-paddings': props.borders ? '1rem' : '0'
  }">
    <div
      v-for="(_, i) in series.length"
      :key="categories[i]"
      :class="['stats__item', !activeCharts?.includes(categories[i]) && props.activeCharts && 'stats__item--unactive']"
      @click="clickHandler(categories[i])"
    >

      <div class="stats__item-value">
        <v-preloader v-if="loading" type="dots"/>
        {{ !loading ? series[i] : "" }}
      </div>

      <div class="stats__item-title">
          <span
            v-if="props.colors.length"
            class="marker"
            :style="{'--marker-color': colors[i % colors.length]}"
          />
        <v-preloader v-if="loading" type="dots"/>
        {{ !loading ? categories[i] : "" }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: grid;
  grid-template-columns: repeat(var(--itemsCount), 1fr);
  gap: 2rem 1rem;

  &__item {
    gap: .2rem;
    display: flex;
    flex-direction: column;
    padding: var(--vertical-paddings) 2rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-s);
    cursor: pointer;
    &--unactive {
      opacity: 0.3;
      transition: var(--transition-fast);
      &:hover {
        opacity: 0.7;
      }
    }
    &-title {
      display: flex;
      align-items: center;
      gap: .6rem;
      font: var(--font-xs);
      color: var(--secondary-color);
    }

    &-value {
      font: var(--font-xxm);
      display: flex;
      align-items: center;
      gap: .8rem;
    }
  }
}

.marker {
  min-width: .8rem;
  min-height: .8rem;
  border-radius: 50%;
  background: var(--marker-color);
}
</style>