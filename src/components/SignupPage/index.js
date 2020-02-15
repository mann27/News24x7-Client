
import React from 'react'
import { Formik } from 'formik'
import validate from './validate-yup'
import getValidationSchema from './getValidationSchema-yup'
import './signup.css'

const initialValues = {
  email: '',
  userName: '',
  password: '',
  passwordConfirmation: '',
  consent: false,
}

export default function SignupPage() {
  return (
    
    <Formik
        initialValues={initialValues}
    validate={validate(getValidationSchema)}
    onSubmit={onSubmit}
      render =   {Signup}
    />
  )
}

function Signup(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props

  return (
    <div className="form">
      <label className="form-field" htmlFor="email">
        <span>E-mail:</span>
        <input name="email" type="email" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.email}</div>

      <label className="form-field" htmlFor="userName">
        <span>UserName</span>
        <input name="userName" type="name" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.name}</div>

      <label className="form-field" htmlFor="password">
        <span>Password:</span>
        <input name="password" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.password}</div>

      <label className="form-field" htmlFor="passwordConfirmation">
        <span>Confirm password:</span>
        <input name="passwordConfirmation" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.passwordConfirmation}</div>

      <label className="form-field" htmlFor="consent">
        <span>Consent:</span>
        <input name="consent" type="checkbox" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.consent}</div>

      <button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
    </div>
  )
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000)
}