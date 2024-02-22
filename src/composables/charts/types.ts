import {seriesType} from "@/models/interfaces/chartTypes.ts";
import {formatters} from "@/utils/scripts.ts";

export interface IChartConfigProps {
  type: 'bar' | 'area' | 'donut',

  direction?: 'column' | 'row',
  categories?: string[],
  colors?: string[],
  horizontal?: boolean,
  formatterX?: keyof typeof formatters,
  formatterY?: keyof typeof formatters,
  tooltipNote?: string,
  statBorders?: boolean,
};

export interface IChartTitleProps {
  title?: string,
  loading: boolean,
  count?: string | number,
  note?: string,
  percent?: {
    value: number | string,
    increase: boolean,
  },
}

export interface IChartProps extends IChartTitleProps{
  series: number[] | seriesType[],
};