interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

const registrationFormValidation = (formValues: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!formValues.firstName) errors.firstName = "First Name is required";
  if (!formValues.lastName) errors.lastName = "Last Name is required";
  if (!formValues.email) errors.email = "Email is required";
  if (!formValues.phone) errors.phone = "Phone number is required";
  if (!formValues.password) errors.password = "Password is required";
  if (formValues.password !== formValues.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!formValues.agreeTerms) errors.agreeTerms = "You must agree to the terms";

  return errors;
};

export default registrationFormValidation;
