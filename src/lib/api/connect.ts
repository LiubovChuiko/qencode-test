import {checkWithAuth, fetchWithoutAuth} from './fetchApi';
import {mockLoginBodyResponse, mockResetPasswordResponse} from 'lib/mock';
import {
  LoginResponse,
  ResetResponse,
  ResetPasswordParams,
} from './api-data-types';
import * as URI from './constants';

export default class ConnectionServices {
  static login = async (
    user: string,
    passw: string,
  ): Promise<LoginResponse> => {
    let response;
    let error;

    //fake success
    if (user === 'admin@goooogle.com') {
      response = mockLoginBodyResponse();
      return {response, error};
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: user,
        password: passw,
      }),
    };

    const res = await fetchWithoutAuth(URI.LOGIN_API, options);
    if (res.error) error = res.error.message;
    response = await res.response;
    return {response, error};
  };

  static resetPassword = async (
    email: string,
    redirectUrl?: string,
  ): Promise<ResetResponse> => {
    let response;
    let error;

    //fake success
    if (email === 'admin@goooogle.com') {
      response = mockResetPasswordResponse();
      return {response, error};
    }

    const params: ResetPasswordParams = {
      email: email,
    };
    if (redirectUrl) params.redirect_url = redirectUrl;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    const res = await fetchWithoutAuth(URI.PASSWORD_RESET_API, options);
    if (res.error) error = res.error.message;
    response = await res.response;
    return {response, error};
  };

  static updatePassword = async (password: string): Promise<ResetResponse> => {
    let response;
    let error;

    //fake success
    if (password === '2244&Admin88') {
      response = mockLoginBodyResponse();
      return {response, error};
    }

    const params = {
      token: 'token',
      secret: 'secret',
      password: password,
      password_confirm: 'password_confirm',
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    const res = await fetchWithoutAuth(URI.PASSWORD_SET_API, options);
    if (res.error) error = res.error.message;
    response = await res.response;
    return {response, error};
  };
}
