export interface IFilterTypes {
  name: string
  value: string
}

export interface IFilter {
  fromDate: string,
  toDate: string,
  projectId: null | number
}

export interface IErrorItem {
  count: number
  errorCode: number
  type: string | null
}