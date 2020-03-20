import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import propTypes from 'prop-types'

const authRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    />
)

authRoute.propTypes = {
    authenticated: propTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated
    }
}

export default connect(mapStateToProps)(authRoute);