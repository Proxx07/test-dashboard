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