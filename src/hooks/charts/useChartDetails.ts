import {computed, ref, watch} from "vue";
import {IChartConfigProps, IChartProps} from "@/hooks/charts/types.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

export const useChartDetails = (props: IChartProps & IChartConfigProps) => {
  const chart = ref();

  const statCounts = computed<number[]>(() => {
    if (props.type === 'donut') return props.series as number[]
    return (props.series as seriesType[]).map(item => (item.data as number[]).reduce((acc, curr) => acc += curr))
  });

  const summary = computed(() => statCounts.value.reduce((acc, curr) => acc += curr))

  const statsValues = computed<string[]>(() => {
    return statCounts.value.map(count => (count / summary.value * 100).toFixed(2) + "%")
  });

  const statsNames = computed<string[]>(() => {
    if (props.type === 'donut') return props.categories ?? []
    return (props.series as seriesType[]).map(item => item.name)
  });

  const activeCharts = props.type === 'bar' ? ref<string[]>(statsNames.value.map(i => i)) : undefined
  const toggleCategory = (value: string) => {
    if (!value || !chart.value || !Array.isArray(activeCharts?.value)) return
    chart.value.toggleSeries(value)
    activeCharts?.value.includes(value) ? activeCharts.value = activeCharts?.value.filter((str) => str !== value) : activeCharts?.value.push(value)
  };

  watch(() => props.loading, () => {
    if (activeCharts) activeCharts.value = statsNames.value.map(i => i)
  });

  return {
    chart,
    activeCharts,
    toggleCategory,

    statsValues,
    statsNames,
  }
}