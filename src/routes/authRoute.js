import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const authRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    />
)
export default authRoute;