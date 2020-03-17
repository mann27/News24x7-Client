import React, { Component } from 'react'
import { Paper, Grid, Button } from '@material-ui/core'
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
        let commentMarkup = this.state.comments ? (
            this.state.comments.map(comment => <Comment comment={comment} />)
        ) : (<p>Loading comments..</p>);
        return (
            <Paper >
                <Grid container spacing={3} class="postshape">
                    <Grid item={true} xs={3} >
                        <img src={this.props.post.userImage} alt="user" class="usershape"  />
                         <div className="handle"> {this.props.post.handleName} </div>
                      
                    </Grid>
                    <Grid item={true} xs={9} class="title"  >
                        <b >{this.props.post.title}</b>
                    </Grid>
                </Grid>
                <div className="postbody"><p>{this.props.post.body}</p></div>
                <p>likes:{this.props.post.likeCount}</p>
                <button  onClick={this.handleShowCommentsClick}>show</button>
                <p>Comments {this.props.post.commentCount}</p>
                {this.state.showComments ? <div>{commentMarkup}</div> : null}
            </Paper>
        )
    }
}
