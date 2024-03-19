import React from 'react';
import './textInput.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  type?: HTMLInputElement['type'];
  className?: string;
  label?: string;
  required?: boolean;
  errorText?: string;
  RhsComponent?: JSX.Element;
  onChange?: (e: any) => void;
}

const TextInput = React.memo(
  ({
    className,
    label,
    errorText,
    id,
    required,
    type,
    placeholder,
    RhsComponent,
    onChange,
    ...rest
  }: Props) => {
    return (
      <>
        {!!label && <div className="label">{label}</div>}
        <div className="textInput">
          <input
            id={id}
            placeholder={placeholder ? placeholder : ''}
            required={required}
            type={type}
            onChange={onChange}
          />
          {RhsComponent && <div>{RhsComponent}</div>}
        </div>

        {!!errorText && <div className="validationMessage">{errorText}</div>}
      </>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
export type {Props};
