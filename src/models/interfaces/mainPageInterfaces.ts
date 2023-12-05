export interface IFilterTypes {
  name: string
  value: string
}

export interface IDate {
  fromDate: string,
  toDate: string,
}

export interface IFilter extends IDate {
  projectId?: string | number | null
}

export interface IErrorItem {
  count: number
  errorCode: number
  type: string | null
}

export interface IStatistic {
  summary: number,
  gcp: number,
  check: number
}