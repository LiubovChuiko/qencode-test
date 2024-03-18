import React from 'react';
import {useNavigate} from 'react-router-dom';
import ConnectionServices from 'lib/api/connect';
import NotificationService from 'services/notification';
import * as Utils from 'lib/utils';
import {Button, Header, PasswordInput} from 'ui/components';

import styles from '../ResetPassword/reset.module.scss';


interface FormElements extends HTMLFormControlsCollection {
  password: HTMLInputElement;
  checkpassword: HTMLInputElement;
}
interface ResetFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type ValidationErrors = {
  passwordError: string | undefined;
  checkpasswordError: string | undefined;
} | null;

export default function SetPasswordScreen() {
  const [errors, setErrors] = React.useState<ValidationErrors>(null);
  const navigate = useNavigate();

  const validateForm = React.useCallback(
    (password: string, checkpassword: string) => {
      let newErrors: ValidationErrors = {
        passwordError: undefined,
        checkpasswordError: undefined,
      };

      if (!Utils.validatePassword(password)) {
        newErrors.passwordError =
          'Password should contain at least one number, one uppercase character, one special symbol and be at least 8 characters long';
      }

      if (checkpassword !== password) {
        newErrors.checkpasswordError = 'Does not match to new password';
      }

      if (!!newErrors.passwordError || !!newErrors.checkpasswordError) {
        setErrors(newErrors);
        return false;
      }

      return true;
    },
    [setErrors],
  );

  const handleSet = React.useCallback(
    async (event: React.FormEvent<ResetFormElement>) => {
      event.preventDefault();
      setErrors(null);
      const password = event.currentTarget.elements.password.value;
      const checkpassword = event.currentTarget.elements.checkpassword.value;
      const isValid = validateForm(password, checkpassword);
      if (isValid) {
        const res = await ConnectionServices.updatePassword(password);
        if (res.error || res.response!.error !== 0) {
          const message = res.response ? res.response.detail : res.error;
          NotificationService.notifyError(message);
        }
        if (!res.response) return;
        NotificationService.notifySuccess("Success!!!", 3000)
        setTimeout(() => {
            navigate('/');
          }, 3000);
      }
    },
    [setErrors, navigate, validateForm],
  );

  return (
    <>
      <Header />
      <div className={styles.section}>
        <div className={styles.reset}>
          <span className={styles.title}>Create new Password?</span>

          <div className={styles.reset_form}>
            <form onSubmit={handleSet} method="POST">
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Password"
                required={true}
                name={'password'}
                errorText={errors?.passwordError}
              />
              <PasswordInput
                id="checkpassword"
                label="Confirm Password"
                placeholder="Password"
                required={true}
                name={'checkpassword'}
                errorText={errors?.checkpasswordError}
              />

              <div className={styles.submit}>
                <Button type="submit" active={true} label="Reset Password" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
