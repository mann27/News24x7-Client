import React, { Component } from 'react'
import './commentStyle.css'

export default class Comment extends Component {
    render() {
        return (
            <div className="commentContainer">
                <b className="handle">{this.props.comment.userHandle}</b>
                <p className="combody">{this.props.comment.body}</p>
                <hr style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 5
                }} />
            </div>
        )
    }
}
