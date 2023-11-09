export interface IFilterTypes {
  name: string
  value: string
}

export interface IDate {
  fromDate: string,
  toDate: string,
}

export interface IFilter extends IDate {
  projectId?: null | number
}

export interface IErrorItem {
  count: number
  errorCode: number
  type: string | null
}