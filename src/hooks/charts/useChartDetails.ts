import {computed} from "vue";
import {IChartConfigProps, IChartProps} from "@/hooks/charts/types.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";

export const useChartDetails = (props: IChartProps & IChartConfigProps) => {
  const chipType = computed<string>(() => props.percent?.increase ? 'positive' : 'negative');

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

  return {
    chipType,

    statsValues,
    statsNames,
  }
}