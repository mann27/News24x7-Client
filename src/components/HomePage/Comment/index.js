import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div>
                <li> {this.props.comment.body}</li>
            </div>
        )
    }
}
