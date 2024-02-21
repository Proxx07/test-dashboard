<script setup lang="ts">
import {computed} from "vue";
import {IChartTitleProps} from "@/hooks/charts/types.ts";
const props = defineProps<IChartTitleProps>()

const chipType = computed<string>(() => props.percent?.increase ? 'positive' : 'negative');
</script>

<template>
  <div class="chart__title" v-if="title">
    <div class="chart__title-name">
      {{ title }}
    </div>

    <div class="chart__title-right">
      <div class="chart__title-details">
        <div class="chart__count" v-if="count !== undefined">
          <v-preloader type="dots" v-if="loading"/>
          {{ !loading ? `${count}` : "" }}
        </div>
        <div class="chart__note" v-if="note">
          <v-preloader type="dots" v-if="loading"/>
          {{ !loading ? `${note}` : "" }}
        </div>
      </div>

      <v-chip v-if="percent?.value && count && !loading" :type="chipType" icon>
        {{ percent?.value }}
      </v-chip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  &__title {
    padding: 1.4rem 2rem 0;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    &-name {
      flex-grow: 1;
      font: var(--font-xm-m);
    }

    &-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  &__count {
    font: var(--font-xl);
  }

  &__note {
    font: var(--font-xs-m);
  }
}
</style>