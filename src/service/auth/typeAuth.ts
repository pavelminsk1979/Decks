export type ResponseRegisterType = {
  id: string
  name: string
  email: string
}

export type ResponseLoginType = {
  accessToken: string
}

export type InitialStateType = {
  isLoggedIn: boolean
  myUserId: string
  currentUserId: string
  currentError: string | null
}
