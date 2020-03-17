import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import Axios from 'axios';
import Comment from '../Comment'

export default class Post extends Component {

    state = {
        comments: null
    }

    componentDidMount() {
        Axios.get(`/post/${this.props.post.postId}`)
            .then((res) => {
                this.setState({
                    comments: res.data.comments
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let commentMarkup = this.state.comments ? (
            this.state.comments.map(comment => <Comment comment={comment} />)
        ) : (<p>Loading comments..</p>);
        return (
            <Paper>
                <Grid container spacing={3} style={{ marginTop: '15px' }}>
                    <Grid item={true} xs={3}>
                        <img src={this.props.post.userImage} alt="user" style={{ width: '50px', height: '50px' }} />
                        {this.props.post.handleName}
                    </Grid>
                    <Grid item={true} xs={9}>
                        <b>{this.props.post.title}</b>
                    </Grid>
                </Grid>
                <p>{this.props.post.body}</p>
                <p>likes:{this.props.post.likeCount}</p>
                <p>Comments {this.props.post.commentCount}</p>
                {commentMarkup}
            </Paper>
        )
    }
}