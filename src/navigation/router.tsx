import {createBrowserRouter} from 'react-router-dom';
import { HomeScreen, LoginScreen, ResetPasswordScreen, SetPasswordScreen } from 'ui';

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeScreen />,
    },
    {
      path: '/login',
      element: <LoginScreen />,
    },
    {
      path: "/reset_password",
      element: <ResetPasswordScreen />,
    },
    {
      path: "/set_password",
      element: <SetPasswordScreen />,
    },
  ]);

  export default router;