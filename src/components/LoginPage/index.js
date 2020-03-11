import React, { Component } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import '../SignupPage/signup.css'
const MIN_PASSWORD_LENGTH = 6;


class LoginPage extends Component {
    render() {
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("Logging in", values);
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
                                    Login
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        )
    }
}

export default LoginPage;
