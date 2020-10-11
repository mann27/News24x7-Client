import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './help.css'

import HelpRoutes from '../../routes/HelpRoutes'

export default class HelpPage extends Component {
    render() {
        return (
            <Grid container >
                <Grid item={true} sm={4} style={{ marginTop: '150px', marginBottom: '160px' }} >
                    <center>
                        <Link to="/help/support" style={{ textDecoration: 'none' }}>
                            <h1 className="side-menu-title">Support</h1>
                        </Link>
                    
                        <Link to="/help/faq" style={{ textDecoration: 'none' }}>
                            <h1 className="side-menu-title">FAQ's</h1>
                        </Link>
                    </center>
                </Grid>
                <Grid item={true} sm={8}>
                    <HelpRoutes />
                </Grid>
            </Grid>
        )
    }
}
