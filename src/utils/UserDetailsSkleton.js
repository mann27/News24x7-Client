import React from 'react'
import { Paper } from '@material-ui/core'
import spin from './black_spinner.gif'

export default function UserDetailsSkleton() {
    return (
        <Paper style={{ padding: '20px' }}>
            <center>
                <img src={spin} alt="loading..."></img>
            </center>
        </Paper>
    )
}
