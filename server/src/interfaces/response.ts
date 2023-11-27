export interface GeneralResponse {
  status: number;
  message: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  token?: string;
}
