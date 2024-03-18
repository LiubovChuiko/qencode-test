import React, {HTMLInputTypeAttribute} from 'react';
import {Props} from 'ui/components/TextInput';
import {TextInput} from 'ui/components';

const PasswordInput = React.memo(
  ({
    className,
    name,
    label,
    placeholder,
    errorText,
    id,
    required,
    RhsComponent,
    ...rest
  }: Props) => {
    const [passwordType, setPasswordType] =
      React.useState<HTMLInputTypeAttribute>('password');

    const handlePasswordType = React.useCallback(() => {
      const current = passwordType;
      if (current === 'password') {
        setPasswordType('text');
      } else {
        setPasswordType('password');
      }
    }, [setPasswordType, passwordType]);

    return (
      <TextInput
        id={id}
        name={name}
        label={label}
        placeholder={placeholder}
        type={passwordType}
        required={true}
        errorText={errorText}
        RhsComponent={
          <button
            type="button"
            onClick={handlePasswordType}
            className="visibility"
          />
        }
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
