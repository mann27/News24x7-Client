import React from 'react'
import { Paper } from '@material-ui/core'
import spin from './black_spinner.gif'

export default function PostSkleton() {
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Paper style={{ padding: '50px', margin: '10px' }} key={index}>
            <center>
                <img src={spin} alt="loading..."></img>
            </center>
        </Paper>
    ))
    return (
        <div>
            {content}
        </div>
    )
}
