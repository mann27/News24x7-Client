import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import { Formik } from "formik"
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { Avatar, Typography, Grid, Container, TextField, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import * as Yup from "yup"
import '../SignupPage/signup.css'
//Redux 
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'

const MIN_PASSWORD_LENGTH = 6;

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

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            dberrors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                dberrors: nextProps.ui.errors
            })
        }
    }

    render() {
        const { ui: { loading }, classes } = this.props
        const { dberrors } = this.state
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("Logging in", values);
                        this.props.loginUser(values, this.props.history)
                        setSubmitting(false);
                    }, 500);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('E-mail is not valid!')
                        .required('E-mail is required!'),
                    password: Yup.string()
                        .required('Password is required!')
                        .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
                        .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <div className={classes.wrapper} >
                            <Container component='div' maxWidth='xs'>
                                <div style={{textAlign: 'center'}}>
                                    <Avatar className={classes.avatar} >
                                        <LockOpenIcon style={{fontSize: 'inherit'}}/>
                                    </Avatar>
                                    <Typography component='h4' variant='h4' style={{padding: '15px 0'}}>Log In</Typography>
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {!loading ? 
                                            (dberrors.err && (<Alert severity="error" style={{textTransform: 'capitalize'}}>{dberrors.err}</Alert>)) 
                                            || (dberrors.general && (<Alert severity="error" style={{textTransform: 'capitalize'}}>{dberrors.general}</Alert>)) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoFocus
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
                                                value={values.email}
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
                                                onChange={handleChange}
                                                required
                                                type="password"
                                                value={values.password}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <button type='submit' onClick={handleSubmit} disabled={loading}>Log In! {loading ? <CircularProgress size={17} thickness={6} /> : null}</button>
                                            <div><Link to="/signup">Don't have an Account? Sign Up here</Link></div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                    );
                }}
            </Formik>
        )
    }
}

LoginPage.propTypes = {
    loginUser: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    ui: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage));
