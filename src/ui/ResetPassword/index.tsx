import React from 'react';
import ConnectionServices from 'lib/api/connect';
import NotificationService from 'services/notification';
import * as Utils from 'lib/utils';
import {Button, Header, TextInput} from 'ui/components';

import styles from './reset.module.scss';
import {useNavigate} from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface ResetFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type ValidationErrors = {
  emailError: string | undefined;
} | null;

export default function ResetPasswordScreen() {
  const [errors, setErrors] = React.useState<ValidationErrors>(null);

  const navigate = useNavigate();

  const validateForm = React.useCallback(
    (email: string) => {
      let newErrors: ValidationErrors = {
        emailError: undefined,
      };

      if (!Utils.validateEmail(email)) {
        newErrors.emailError = 'Email is invalid';
      }

      if (!!newErrors.emailError) {
        setErrors(newErrors);
        return false;
      }

      return true;
    },
    [setErrors],
  );

  const handleReset = React.useCallback(
    async (event: React.FormEvent<ResetFormElement>) => {
      event.preventDefault();
      setErrors(null);
      const email = event.currentTarget.elements.email.value;
      const isValid = validateForm(email);
      if (isValid) {
        const res = await ConnectionServices.resetPassword(email);
        if (res.error || res.response!.error !== 0) {
          const message = res.response ? res.response.detail : res.error;
          NotificationService.notifyError(message);
          return;
        }
        if (!res.response) return;
        NotificationService.notifySuccess('Success!', 3000);
        setTimeout(() => {
          navigate('/set_password');
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
          <span className={styles.title}>Forgot Password?</span>

          <div className={styles.reset_form}>
            <form onSubmit={handleReset} method="POST">
              <TextInput
                id="email"
                placeholder="Enter your email"
                required={true}
                name={'email'}
                errorText={errors?.emailError}
              />

              <div className={styles.submit}>
                <Button type="submit" active={true} label="Send" />
              </div>
              <div className={styles.cancel}>
                <Button
                  type="button"
                  active={false}
                  label="Cancel"
                  onClick={() => navigate('/')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
