import React, { Component } from 'react'
import { Container, Grid, Paper } from '@material-ui/core'
import colors from '../../utils/base-module'
import './homeStyle.css';

class HomePage extends Component {
    render() {
        return (
            <div style={{ backgroundColor: colors.LIGHT_GREY }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing="2">
                        <Grid item xs="8">
                            <Paper style={{ padding: '10px' }}>
                                <input type="text" name="new post" className="add-new-post" placeholder="Create Post"></input>
                            </Paper>
                            <Paper>
                                <h1>Post1</h1>
                            </Paper>
                            <Paper>
                                <h1>Post2</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs="4">
                            <Paper>
                                <h1>XTRA</h1>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default HomePage;