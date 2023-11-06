export interface ITableHead {
  name: string
  value: string
  width?: string
}

export interface IResponse<T> {
  message: string,
  response: T,
  statusCode: number
}