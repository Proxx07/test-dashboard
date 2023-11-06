export interface ITableHead {
  name: string
  value: string
}

export interface IResponse<T> {
  message: string,
  response: T,
  statusCode: number
}