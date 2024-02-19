import {seriesType} from "@/models/interfaces/chartTypes.ts";
import {formatters} from "@/utils/scripts.ts";

export interface IChartConfigProps {
  categories?: Array<number | string>,
  type: 'bar' | 'area' | 'donut',
  colors?: string[],
  formatterX?: keyof typeof formatters,
  formatterY?: keyof typeof formatters,
  tooltipNote?: string,
};

export interface IChartProps {
  title: string,
  loading: boolean,
  count?: string | number,
  note?: string,
  series: number[] | seriesType[],
  percent?: {
    value: number | string,
    increase: boolean,
  },
};
