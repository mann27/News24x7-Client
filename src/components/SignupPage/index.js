import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import propTypes from "prop-types";
import { Formik } from "formik";
import validate from "./validate-yup";
import getValidationSchema from "./getValidationSchema-yup";
import "./signup.css";
import defaultPic from "./defaultPic.png";
import defaultPicLook from "./defaultPicLook.png";
import defaultPicPassword from "./defaultPicHide.png";

//redux
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

const styles = {
  wrapper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "calc(100vh - 170px)",
  },
};

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      dberrors: {},
      avatar: false,
      avatarPassword: false,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ dberrors: nextProps.ui.errors });
    }
  }

  changeAvatar = () => {
    this.setState({
      avatar: true,
      avatarPassword: false,
    });
  };

  changeAvatarOriginal = () => {
    this.setState({
      avatar: false,
      avatarPassword: false,
    });
  };
  changeAvatarPassword = () => {
    this.setState({
      avatar: true,
      avatarPassword: true,
    });
  };
  render() {
    const {
      ui: { loading },
      classes,
    } = this.props;
    const { dberrors } = this.state;

    return (
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          passwordConfirmation: "",
        }}
        validate={validate(getValidationSchema)}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setTimeout(() => {
            const newUserData = {
              email: values.email,
              password: values.password,
              confirmPassword: values.passwordConfirmation,
              handle: values.userName,
            };
            console.log("User has been sucessfully saved!", newUserData);
            this.props.signupUser(newUserData, this.props.history);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <div className="SignUpContainer">
            <div className="SignUpBox">
              <div className="SignUpHeader">
                <h1 className="SignUpHeading">SIGN UP</h1>
                <div className="SignUpHeaderImg">
                  <img
                    src={
                      this.state.avatar
                        ? this.state.avatarPassword
                          ? defaultPicPassword
                          : defaultPicLook
                        : defaultPic
                    }
                  ></img>
                </div>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {!loading
                    ? (dberrors.email && (
                        <Alert
                          severity="error"
                          style={{ textTransform: "capitalize" }}
                        >
                          {dberrors.email}
                        </Alert>
                      )) ||
                      (dberrors.error && (
                        <Alert
                          severity="error"
                          style={{ textTransform: "capitalize" }}
                        >
                          {dberrors.error}
                        </Alert>
                      ))
                    : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.name && touched.name ? true : false}
                    fullWidth
                    helperText={errors.name && touched.name && errors.name}
                    id="userName"
                    label="Username"
                    name="userName"
                    className="SignUpUserName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    onClick={this.changeAvatar}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email ? true : false}
                    fullWidth
                    helperText={errors.email && touched.email && errors.email}
                    id="email"
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    variant="outlined"
                    onClick={this.changeAvatarOriginal}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password ? true : false}
                    fullWidth
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                    id="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="password"
                    variant="outlined"
                    onClick={this.changeAvatarPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                        ? true
                        : false
                    }
                    fullWidth
                    helperText={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    id="passwordConfirmation"
                    label="Confirm Password"
                    name="passwordConfirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="password"
                    variant="outlined"
                    onClick={this.changeAvatarPassword}
                  />
                </Grid>
                <div className="SignUpSubmit">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    style={{ margin: "5px" }}
                    disabled={loading}
                  >
                    Sign Up{" "}
                    {loading ? (
                      <CircularProgress size={17} thickness={6} />
                    ) : null}
                  </button>
                  <div className="SignUpLink">
                    <Link to="/login">
                      Already have an Account ? Log In here
                    </Link>
                  </div>
                </div>
              </Grid>
            </div>
          </div>
        )}
      </Formik>
    );
  }
}

SignupPage.propTypes = {
  user: propTypes.object.isRequired,
  ui: propTypes.object.isRequired,
  signupUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user,
  };
};

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignupPage));
