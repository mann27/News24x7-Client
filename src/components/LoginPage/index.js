import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import { Formik } from "formik";
import * as Yup from "yup";
import '../SignupPage/signup.css'
//Redux 
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

const MIN_PASSWORD_LENGTH = 6;


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
        const { ui: { loading } } = this.props
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
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email" >Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email && "error"}
                                />
                                {errors.email && touched.email && (
                                    <div className="form-field-error">{errors.email}</div>
                                )}
                                <label htmlFor="email" >Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password && "error"}
                                />
                                {errors.password && touched.password && (
                                    <div className="form-field-error">{errors.password}</div>
                                )}
                                <button type="submit" disabled={isSubmitting}>
                                    login
                                </button>
                                {loading ? <p>loading...</p> :
                                    (dberrors.err && (<p className="dberrors">{dberrors.err}</p>))  /* validating user */
                                    || (dberrors.general && (<p className="dberrors">{dberrors.general}</p>)) /* checking user cred */
                                }
                                <br />
                                <small>don't have an account ? sign up <Link to="/signup">here</Link></small>
                            </form>
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

export default connect(mapStateToProps, mapActionsToProps)(LoginPage);
