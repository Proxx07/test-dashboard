<script setup lang="ts">
import PercentLabel from "@/components/charts/PercentLabel.vue";

interface ChartDifference {
  type: "inc" | "dec",
  value: string | number
}

const props = defineProps<{
  colors: string[]
  series: number[]
  categories: Array<string | number>
  difference: ChartDifference[]
}>()
</script>

<template>
  <div class="stats">
    <div class="stats__info-item" v-for="(_, i) in series.length" :key="i">
      <div class="stats__info-title">
          <span
            v-if="props.colors.length"
            class="marker"
            :style="{'--marker-color': colors[i % colors.length]}"
          />
        {{categories[i]}}
      </div>

      <div class="stats__info-value">
        {{series[i]}}%
        <percent-label :increase="difference[i].type === 'inc'" :value="difference[i].value"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  &__info {
    &-item {
      gap: .8rem;
      display: flex;
      flex-direction: column;
    }

    &-title {
      display: flex;
      align-items: center;
      gap: .6rem;
      .marker {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        background: var(--marker-color);
      }
    }

    &-value {
      font-size: 2.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: .8rem;
    }
  }
}
</style>