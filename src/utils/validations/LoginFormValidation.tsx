interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const loginFormValidation = (formValues: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!formValues.email) errors.email = "Email is required";
  if (!formValues.password) errors.password = "Password is required";
  return errors;
};

export default loginFormValidation;
