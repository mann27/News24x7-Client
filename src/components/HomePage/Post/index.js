import React, { Component } from 'react'
import { Paper, Grid, Container } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';

import './postStyle.css'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton';

class Post extends Component {

    render() {
        dayjs.extend(relativeTime)
        let { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId } = this.props.post;
        const redirect = `/post/${this.props.post.postId}`;
        return (
            <Paper style={{ marginTop: '25px', paddingLeft: '10px' }}>
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
                                <p style={{ marginLeft: '20px', fontSize: 'medium' }}>{tags}</p>
                            </div>
                        </Grid>
                    </Grid>
                    <p className="postbody">{body}</p>
                </Link>
                <Grid container spacing={3}>
                    <Grid item={true} xs={9}>
                        <div className="like-share-comment-bookmark">
                            <LikeButton key={postId} postId={postId} />
                            <p>{likeCount} likes</p>

                            <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                            <p style={{ marginLeft: '5px' }}>{commentCount} Comments</p>
                            <BookmarkIcon />
                            <ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
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