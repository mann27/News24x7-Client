import * as Yup from 'yup'

const MIN_PASSWORD_LENGTH = 6;
export default function getYupValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('E-mail is required!'),
    userName: Yup.string().required('Required'),
    password: Yup.string()
      .required('Password is required!')
      .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
    passwordConfirmation: Yup.string()
      .oneOf([values.password], 'Passwords are not the same!')
      .required('Password confirmation is required!'),
  })
}