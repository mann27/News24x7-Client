import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import HelpRoutes from '../../routes/HelpRoutes'

export default class HelpPage extends Component {
    render() {
        return (
            <div>
                <Grid container style={{ marginTop: '50px' }}>
                    <Grid item={true} sm={4}>
                        <center>
                            <Link to="/help/support" >support</Link>
                            <br />
                            <Link to="/help/faq">FAQ's</Link>
                        </center>
                    </Grid>
                    <Grid item={true} sm={8}>
                        <HelpRoutes />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
