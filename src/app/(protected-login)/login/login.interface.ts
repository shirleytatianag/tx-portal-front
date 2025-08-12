export interface LoginInterface {
  username: string;
  user_password: string;
}

export interface LoginResponse {
  token?: string;
  message?: string;
}