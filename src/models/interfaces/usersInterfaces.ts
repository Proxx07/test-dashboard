import {LocationQueryValue} from "vue-router";
import {roles} from "@/utils/roles.ts";

export interface IUser {
  id?: string,
  name: string,
  projectId: string,
  email: string,
  phone: string,
  role: roles | null,
}

export interface IUserWithDate extends IUser{
  createdAt?: string,
  updatedAt?: string
}

export interface IUserWithPassword extends IUser {
  password: string
}


export interface IUserFilter {
  page: LocationQueryValue,
  search: string,
  fromDate: string,
  toDate: string
}