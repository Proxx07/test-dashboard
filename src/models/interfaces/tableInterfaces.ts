import {accesses} from "@/utils/roles.ts";

export interface ITableHead {
  name: string
  value: string

  width?: string
  defaultText?: string
  access?: accesses
}

export interface IResponse<T> {
  message: string,
  result: T,
  statusCode: number
}

export interface IListResponse<T> {
  totalPages?: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  count: number,
  limit: number,
  result: T
}