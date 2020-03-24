import React, { Component } from 'react'
import './createPostStyle.css'

class CreatePost extends Component {
    render() {
        return (
            <div>
                <input name="new post" className="add-new-post" placeholder="Create Post"></input>
            </div>
        )
    }
}

export default CreatePost;