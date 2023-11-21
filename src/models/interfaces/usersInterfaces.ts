import {LocationQueryValue} from "vue-router";

export enum roles {
  main = 0,
  admin = 1,
  moderator = 2,
  operator = 3
}

export interface IUser {
  id: string,
  name: string,
  projectId: string,
  email: string,
  phone: string,
  role: roles,
  createdAt: string,
  updatedAt: string
};

export interface IUserFilter {
  page: LocationQueryValue,
  search: string,
  fromDate: string,
  toDate: string
}