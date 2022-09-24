export interface UserLoginModel {
  email: string,
  password: string
}

export interface UserRegisterModel {
  firstName: string,
  lastName: string,
  email: string
  password: string,
  phone: string
}

export interface UserRole {
  email: string,
  roleName: string,
}
