import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import { Avatar, Typography, Grid, Container, TextField, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import propTypes from 'prop-types'
import { Formik } from 'formik'
import validate from './validate-yup'
import getValidationSchema from './getValidationSchema-yup'
import './signup.css'

//redux
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions'


const styles = {
  wrapper: {
    alignItems:'center',
    display:'flex', 
    justifyContent: 'center', 
    minHeight: 'calc(100vh - 170px)', 
  },
  avatar: {
    background:'red', 
    boxShadow: '0px 2px 3px #000000ad',
    fontSize:'3em', 
    height: 'fit-content', 
    margin:'0 auto',
    padding:'10px', 
    width: 'fit-content', 
  }
}

class SignupPage extends Component {

  constructor() {
    super();
    this.state = {
      dberrors: {}
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ dberrors: nextProps.ui.errors });
    }
  }
  render() {
    
    const { ui: { loading }, classes } = this.props
    const { dberrors } = this.state

    return (
      <Formik
        initialValues={{
          email: '',
          userName: '',
          password: '',
          passwordConfirmation: '',
        }}
        validate={validate(getValidationSchema)}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setTimeout(() => {
            const newUserData = {
              email: values.email,
              password: values.password,
              confirmPassword: values.passwordConfirmation,
              handle: values.userName
            }
            console.log('User has been sucessfully saved!', newUserData)
            this.props.signupUser(newUserData, this.props.history)
            setSubmitting(false)
          }, 500)
        }}
      >
        {({  touched, errors, handleChange, handleBlur, handleSubmit }) => (
            <div className={classes.wrapper}>
              <Container component='div' maxWidth='sm'>
                <div style={{textAlign: 'center'}}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon style={{fontSize: 'inherit'}}/>
                  </Avatar>

                  <Typography component='h4' variant='h4' style={{padding: '10px 0'}}>SIGN UP</Typography>
                  
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {!loading ? (
                          (dberrors.email && (<Alert severity="error" style={{textTransform: 'capitalize'}}>{dberrors.email}</Alert>))
                          || (dberrors.error && (<Alert severity="error" style={{textTransform: 'capitalize'}}>{dberrors.error}</Alert>))) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          autoFocus
                          error={errors.name && touched.name ? true : false}
                          fullWidth
                          helperText={(errors.name && touched.name) && errors.name}
                          id="userName"
                          label="Username"
                          name="userName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.email && touched.email ? true:false}
                          fullWidth
                          helperText={(errors.email && touched.email) && errors.email}
                          id="email"
                          label="Email"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          type='email'
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.password && touched.password ? true:false}
                          fullWidth
                          helperText={(errors.password && touched.password) && errors.password}
                          id="password"
                          label="Password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.passwordConfirmation && touched.passwordConfirmation ? true:false}
                          fullWidth
                          helperText={(errors.passwordConfirmation && touched.passwordConfirmation) && errors.passwordConfirmation}
                          id="passwordConfirmation"
                          label="Confirm Password"
                          name="passwordConfirmation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <button type='submit' onClick={handleSubmit} style={{margin: '5px'}} disabled={loading}>Sign Up! {loading ? <CircularProgress size={17} thickness={6}/> : null}</button>
                        <div><Link to="/login">Already have an Account ? Log In here</Link></div>
                      </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
        )}
      </Formik >
    )
  }
}

SignupPage.propTypes = {
  user: propTypes.object.isRequired,
  ui: propTypes.object.isRequired,
  signupUser: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  }
}

const mapActionsToProps = {
  signupUser
}

export default (connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignupPage)))