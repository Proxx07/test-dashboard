export interface IFilterTypes {
  name: string
  value: string
}

export interface IFilterDate {
  name: string
  value: [string, string]
}

export interface IFilter {
  page?: number
  projectId?: string | number | null
  fromDate?: string
  search?: string
  toDate?: string
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