export type Detail = [null] | string | null;

export type LoginResponseBody = {
  error: number;
  detail: Detail;
  timestamp: number;
  access_token?: string;
  refresh_token?: string;
  token_expire?: number;
  refresh_token_expire?: number;
};

export type LoginResponse = {
  response: LoginResponseBody | undefined;
  error: string | undefined;
};

export type ResetResponseBody = {
  error: number;
  detail: Detail;
  timestamp: number;
};

export type ResetResponse = {
  response: ResetResponseBody | undefined;
  error: string | undefined;
};

export type ResetPasswordParams = {
  email: string;
  redirect_url?: string;
};

export type SetPassworsParams = {
  token: string;
  secret: string;
  password: string;
  password_confirm?: string;
};
