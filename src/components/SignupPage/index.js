import React, { Component } from 'react'
import { Formik } from 'formik'
import validate from './validate-yup'
import getValidationSchema from './getValidationSchema-yup'
import './signup.css'

class SignupPage extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          userName: '',
          password: '',
          passwordConfirmation: '',
          consent: false,
        }}
        validate={validate(getValidationSchema)}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setTimeout(() => {
            console.log('User has been sucessfully saved!', values)
            setSubmitting(false)
          }, 500)
        }}
      >
        {({ isSubmitting, errors, handleChange, handleSubmit }) => (
          <div className="form">
            <label htmlFor="email">
              <span>E-mail:</span>
              <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.email}</div>

            <label htmlFor="userName">
              <span>UserName</span>
              <input name="userName" type="name" placeholder="Enter username" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.name}</div>

            <label htmlFor="password">
              <span>Password:</span>
              <input name="password" type="password" placeholder="Enter password" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.password}</div>

            <label htmlFor="passwordConfirmation">
              <span>Confirm password:</span>
              <input name="passwordConfirmation" type="password" placeholder="Re-enter password" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.passwordConfirmation}</div>

            <label htmlFor="consent">
              <span>Consent:</span>
              <input name="consent" type="checkbox" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.consent}</div>

            <button type="submit" onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
          </div>
        )}
      </Formik >
    )
  }
}

export default SignupPage;


