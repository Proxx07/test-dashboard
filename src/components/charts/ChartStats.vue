<script setup lang="ts">
const props = defineProps<{
  colors: string[]
  series: Array<string | number>
  categories: Array<string | number>
}>()
</script>

<template>
  <div class="stats">
    <div class="stats__item" v-for="(_, i) in series.length" :key="categories[i]">
      <div class="stats__item-value">
        {{series[i]}}
      </div>

      <div class="stats__item-title">
          <span
            v-if="props.colors.length"
            class="marker"
            :style="{'--marker-color': colors[i % colors.length]}"
          />
        {{categories[i]}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  &__item {
    gap: .2rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    border: 1px solid var(--bg-10);
    border-radius: var(--radius-s);
    margin-bottom: 1.2rem;
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