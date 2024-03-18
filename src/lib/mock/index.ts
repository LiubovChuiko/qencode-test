import {LoginResponseBody, ResetResponseBody} from 'lib/api/api-data-types';

export const mockLoginBodyResponse = (): LoginResponseBody => {
  return {
    error: 0,
    detail: [null],
    timestamp: 1709814840.077122,
    access_token: 'string',
    refresh_token: 'string',
    token_expire: 0,
    refresh_token_expire: 0,
  };
};

export const mockResetPasswordResponse = (): ResetResponseBody => {
  return {
    error: 0,
    detail: [null],
    timestamp: 1709814840.077122,
  };
};
