import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
import copy from "copy-to-clipboard";

import './postStyle.css'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton';

class Post extends Component {

    constructor() {
        super();
        this.state = {
            copyText: ''
        }
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
    }

    copyToClipBoard = () => {
        const el = window.location.href + `/post/${this.props.post.postId}`
        copy(el);
        this.setState({
            copyText: 'Copied!'
        })
    }

    componentDidUpdate() {
        setTimeout(() => this.setState({ copyText: '' }), 3000);
    }

    render() {
        dayjs.extend(relativeTime)
        let { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId } = this.props.post;
        const redirect = `/post/${this.props.post.postId}`;
        return (
            <Paper style={{ marginTop: '25px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
                <Link to={redirect} className="link">
                    <Grid container spacing={3} className="postshape">
                        <Grid item={true} xs={3} >
                            <img src={userImage} alt="user" className="usershape" />
                            <p className="handle"> {handleName} </p>
                        </Grid>
                        <Grid item={true} xs={9} className="title"  >
                            <b style={{ marginBottom: '0px' }}>{title}</b>
                            <div className="time-tags">
                                <p style={{ fontSize: 'small' }}>{dayjs(createdAt).fromNow()}</p>
                                <p style={{ marginLeft: '20px', fontSize: 'medium' }}><u>{tags}</u></p>
                            </div>
                        </Grid>
                    </Grid>
                </Link>
                <a href={body} className="postbody">{body}</a>
                <Grid container spacing={3}>
                    <Grid item={true} xs={9}>
                        <div className="like-share-comment-bookmark">
                            <LikeButton key={postId} postId={postId} />
                            <p>{likeCount} likes</p>

                            <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                            <p style={{ marginLeft: '5px' }}>{commentCount} Comments</p>
                            <BookmarkIcon />
                            {this.state.copyText ? <p>{this.state.copyText}</p> : <a onClick={this.copyToClipBoard}><ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} /></a>}
                            <ReportIcon />
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                    </Grid>
                </Grid>
            </Paper >
        )
    }
}

export default (Post);
