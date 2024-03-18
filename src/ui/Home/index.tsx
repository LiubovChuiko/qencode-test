import React from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AuthServices from 'lib/api/auth';


export default function HomeScreen() {
  const [auth, setAuth] = React.useState(false);
  const [cookies, setCookie] = useCookies(['access_token']);
  const navigate = useNavigate();

  const checkAccessToken = React.useCallback(async () => {
    const verifyToken = await AuthServices.verifyAccessToken();
    if (verifyToken) {
      setAuth(true);
      return;
    }

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return;

    const refresh = await AuthServices.refreshAuthToken(refreshToken);
    if (refresh.error) return false;
    const {access_token, refresh_token} = refresh.response!;
    setCookie('access_token', access_token, {
      path: '/',
      httpOnly: false,
      secure: true,
    });
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
    setAuth(true);
  }, [setAuth, setCookie]);

  React.useEffect(() => {
    checkAccessToken();
  }, []);

  React.useEffect(() => {
    if (!auth) navigate("/login")
  }, [auth, navigate]);

  return (
    <div>Lucky you</div>
  )
}
