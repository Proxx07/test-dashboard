import {seriesType} from "@/models/interfaces/chartTypes.ts";

export type statsDirection = 'column' | 'row';

export interface IChartConfigProps {
  type: 'bar' | 'area' | 'donut',

  direction?: statsDirection,
  categories?: string[],
  colors?: string[],
  horizontal?: boolean,
  //formatterX?: keyof typeof formatters,
  //formatterY?: keyof typeof formatters,
  hideAxises?: boolean,
  patterned?: boolean,
  tooltipNote?: string,
  statBorders?: boolean,
  pie?: number,
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
