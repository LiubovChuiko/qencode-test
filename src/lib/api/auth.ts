import {checkWithAuth, fetchWithoutAuth} from './fetchApi';
import * as URI from './constants';
import {LoginResponse} from './api-data-types';

export default class AuthServices {
  static verifyAccessToken = () => {
    return checkWithAuth(URI.ACCESS_TOKEN_API);
  };

  static getAuthToken = async(access_id: string): Promise<LoginResponse> => {
    let response;
    let error;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        access_id: access_id,
      }),
    };
    const res = await fetchWithoutAuth(URI.REFRESH_TOKEN_API, options);
    if (res.error) error = res.error.message;
    response = await res.response;
    return {response, error};
  };

  static refreshAuthToken = async(refresh_token: string): Promise<LoginResponse> => {
    let response;
    let error;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    };
    const res = await fetchWithoutAuth(URI.REFRESH_TOKEN_API, options);
    if (res.error) error = res.error.message;
    response = await res.response;
    return {response, error};
  };
}
