import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import validate from './validate-yup'
import getValidationSchema from './getValidationSchema-yup'
import './signup.css'
import Axios from 'axios'

class SignupPage extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      dberrors: {}
    }
  }

  render() {
    const { dberrors } = this.state
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
            this.setState({
              email: values.email,
              password: values.password,
              confirmPassword: values.passwordConfirmation,
              handle: values.userName,
              loading: true
            })
            const newUser = {
              email: values.email,
              password: values.password,
              confirmPassword: values.passwordConfirmation,
              handle: values.userName
            }
            console.log('User has been sucessfully saved!', newUser)
            Axios.post('/signup', newUser)
              .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({ loading: false });
                this.props.history.push('/');
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  dberrors: err.response.data,
                  loading: false
                })
              })
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
            {this.state.loading ? <p>loading...</p> : (
              (dberrors.email && (<p className="dberrors">{dberrors.email}</p>))
              || (dberrors.error && (<p className="dberrors">{dberrors.error}</p>))
            )}
            <br />
            <small>Already have an account ? log in <Link to="/login">here</Link></small>
          </div>
        )}
      </Formik >
    )
  }
}

export default SignupPage;


