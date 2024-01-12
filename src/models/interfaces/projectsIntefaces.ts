export interface IRate {
  limit: number
  name: string
  price: number
}

export interface IRateWithRequests extends IRate {
  id: string
  gcpRequests: number
  regulaRequests: number
}

export interface IProject {
  id: string
  name: string
  errorUrl: string
  rateId: string
  successUrl: string
  rate: IRateWithRequests
}


export interface IMockProject {
  id: string,
  name: string,
  logo: string,
  mail: string,
  phone?: string,
  site: string,
  status: 0 | 1
}
export type IAvatar = Pick<IMockProject, 'name' | 'logo' | 'status'>
