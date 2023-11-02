export interface AuthUserInterface {
  phone: string
  password: string
}

export interface AuthorizedUser {
  access_token: string
  id: string
  projectId: number | null
  name: string
  phone: string
  email: string
  role: number
  createdAt: string
  updatedAt: string
}