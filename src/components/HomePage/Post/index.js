import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

export default class Post extends Component {
    render() {
        return (
            <Paper>
                <h1>{this.props.post.body}</h1>
            </Paper>
        )
    }
}
