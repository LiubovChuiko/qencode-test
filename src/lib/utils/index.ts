export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const NUMBER_REGEX = new RegExp(/.*\d/);
export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const SPECIAL_CHARS_REGEX = new RegExp(
  /.*[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
);

export const PASSWORD_VALID_REGEX = new RegExp(
  `^(?=${[
    LENGTH_REGEX.source,
    UPPERCASE_REGEX.source,
    NUMBER_REGEX.source,
    SPECIAL_CHARS_REGEX.source,
  ].join(')(?=')}).*$`,
);

export const validatePassword = (password: string) => {
  if (PASSWORD_VALID_REGEX.test(password)) {
    return true;
  }
  return false;
};

export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
