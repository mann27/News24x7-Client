import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from "formik";
import * as Yup from "yup";
import '../SignupPage/signup.css'
import axios from 'axios';
const MIN_PASSWORD_LENGTH = 6;

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            dberrors: [],
            loading: false
        }
    }
    render() {
        const { dberrors } = this.state
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("Logging in", values);
                        this.setState({
                            loading: true,
                            email: values.email,
                            password: values.password
                        })
                        axios.post('/login', values)
                            .then(res => {
                                console.log(res.data)
                                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                                this.setState({ loading: false })
                                this.props.history.push('/');
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({
                                    dberrors: err.response.data,
                                    loading: false
                                })
                            })
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
                                {this.state.loading ? <p>loading...</p> : (
                                    (dberrors.err && (<p className="dberrors">{dberrors.err}</p>))  /* validating user */
                                    || (dberrors.general && (<p className="dberrors">{dberrors.general}</p>)) /* checking user cred */
                                )}
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

export default LoginPage;
