export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const ACCESS_TOKEN_API = `${BASE_API_URL}/v1/auth/access-token`;
export const REFRESH_TOKEN_API = `${BASE_API_URL}/v1/auth/refresh-token`;

export const LOGIN_API = `${BASE_API_URL}/v1/auth/login`;
export const PASSWORD_RESET_API = `${BASE_API_URL}/v1/auth/password-reset`;
export const PASSWORD_SET_API = `${BASE_API_URL}/v1/auth/password-set`;