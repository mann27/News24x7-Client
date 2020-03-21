import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Axios from 'axios';
import Comment from '../Comment'
import './postStyle.css'
export default class Post extends Component {

    constructor() {
        super();
        this.state = {
            comments: null,
            showComments: false
        }
        this.handleShowCommentsClick = this.handleShowCommentsClick.bind(this);
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

    handleShowCommentsClick() {
        this.setState({
            showComments: true
        })
    }

    render() {
        dayjs.extend(relativeTime)
        let commentMarkup = this.state.comments ? (
            Object.keys(this.state.comments).length === 0 ? <p>No comments</p> :
                this.state.comments.map(comment => <Comment key={comment.id} comment={comment} />)
        ) : (<p>Loading comments..</p>);
        let { userImage, handleName, title, body, likeCount, commentCount, createdAt } = this.props.post;
        return (
            <Paper >
                <Grid container spacing={3} className="postshape">
                    <Grid item={true} xs={3} >
                        <img src={userImage} alt="user" className="usershape" />
                        <div className="handle"> {handleName} </div>

                    </Grid>
                    <Grid item={true} xs={9} className="title"  >
                        <b >{title}</b>
                    </Grid>
                </Grid>
                <p>{dayjs(createdAt).fromNow()}</p>
                <div className="postbody"><p>{body}</p></div>
                <p>likes:{likeCount}</p>
                <button onClick={this.handleShowCommentsClick}>show</button>
                <p>Comments {commentCount}</p>
                {this.state.showComments ? <div>{commentMarkup}</div> : null}
            </Paper>
        )
    }
}
