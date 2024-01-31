export interface IFilterTypes {
  name: string
  value: string
}

export interface IFilterDate {
  name: string
  value: [string, string]
}

export interface IFilter {
  projectId?: string | number | null
  fromDate: string,
  toDate: string,
}

export interface IErrorItem {
  count: number
  errorCode?: number
  type: string
}

export interface IStatistic {
  summary: number,
  gcp: number,
  check: number
}