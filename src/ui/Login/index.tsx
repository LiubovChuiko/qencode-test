import React from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import ConnectionServices from 'lib/api/connect';
import NotificationService from 'services/notification';
import * as Utils from 'lib/utils';
import {
  AuthButton,
  Button,
  Header,
  TextInput,
  PasswordInput,
} from 'ui/components';

import styles from './login.module.scss';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type ValidationErrors = {
  emailError: string | undefined;
  passwordError: string | undefined;
} | null;

export default function LoginScreen() {
  const [emailCompleted, setEmailComplited] = React.useState<boolean>(false);
  const [failureCount, setFailureCount] = React.useState<number>(0);
  const [cookies, setCookie] = useCookies(['access_token']);
  const [errors, setErrors] = React.useState<ValidationErrors>(null);
  const navigate = useNavigate();

  const validateEmail = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (Utils.validateEmail(event.currentTarget.value)) {
        setEmailComplited(true);
      }
    },
    [setEmailComplited],
  );

  const validateForm = React.useCallback(
    (email: string, password: string) => {
      let newErrors: ValidationErrors = {
        emailError: undefined,
        passwordError: undefined,
      };

      if (!Utils.validateEmail(email)) {
        newErrors.emailError = 'Email is invalid';
      }

      if (!Utils.validatePassword(password)) {
        newErrors.passwordError =
          'Password should contain at least one number, one uppercase character, one special symbol and be at least 8 characters long';
      }

      if (!!newErrors.emailError || !!newErrors.passwordError) {
        setErrors(newErrors);
        return false;
      }

      return true;
    },
    [setErrors],
  );

  const handleLogin = React.useCallback(
    async (event: React.FormEvent<LoginFormElement>) => {
      event.preventDefault();
      setErrors(null);
      const email = event.currentTarget.elements.email.value;
      const passw = event.currentTarget.elements.password.value;
      const isValid = validateForm(email, passw);
      if (isValid) {
        const res = await ConnectionServices.login(email, passw);
        if (res.error || res.response!.error !== 0) {
          let currentFailure = failureCount;
          setFailureCount(currentFailure + 1);
          const message = res.response ? res.response.detail : res.error;
          NotificationService.notifyError(message, 3000);
          return;
        }
        if (!res.response) return;
        const {access_token, refresh_token} = res.response;
        setCookie('access_token', access_token, {
          path: '/',
          httpOnly: false,
          secure: true,
        });
        if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
        NotificationService.notifySuccess('Success!', 2000);
        navigate('/');
      }
    },
    [
      setErrors,
      setFailureCount,
      setCookie,
      navigate,
      validateForm,
      failureCount,
    ],
  );

  const onAuthClick = React.useCallback(() => {
    NotificationService.notifyInfo('Not implemented yet');
  }, []);

  return (
    <>
      <Header />
      <div className={styles.section}>
        <div className={styles.signin}>
          <span className={styles.title}>Log in to your account</span>
          <div className={styles.auth_buttons}>
            <AuthButton auth="ic_google" label="Google" onClick={onAuthClick} />
            <AuthButton auth="ic_git" label="Github" onClick={onAuthClick} />
          </div>

          <div className={styles.divider}>OR</div>

          <div className={styles.signin_form}>
            <form onSubmit={handleLogin} method="POST">
              <TextInput
                id="email"
                placeholder="Work email"
                required={true}
                name={'email'}
                errorText={errors?.emailError}
                onChange={e => validateEmail(e)}
              />
              {emailCompleted && (
                <PasswordInput
                  id="password"
                  placeholder="Password"
                  required={true}
                  name={'password'}
                  errorText={errors?.passwordError}
                />
              )}
              {failureCount >= 3 && (
                <div className={styles.forgot_password}>
                  <a href="/reset_password">Forgot your password?</a>
                </div>
              )}
              <div className={styles.submit}>
                <Button type="submit" active={true} label="Log in to qencode" />
              </div>
            </form>
          </div>

          <span className={styles.regular}>
            Is your company new to Qencode? <a href="/">Sign up</a>
          </span>
        </div>
      </div>
    </>
  );
}
