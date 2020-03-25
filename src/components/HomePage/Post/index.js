import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './postStyle.css'
import { Link } from 'react-router-dom'

class Post extends Component {

    render() {
        dayjs.extend(relativeTime)
        let { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags } = this.props.post;
        const redirect = `/post/${this.props.post.postId}`;
        return (
            <Paper style={{ marginTop: '25px', paddingLeft: '10px' }}>
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
                <Grid container spacing={3}>
                    <Grid item={true} xs={9}>
                        <div className="like-comment">
                            <FavoriteIcon />
                            <p>{likeCount} likes</p>
                            <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                            <p style={{ marginLeft: '10px' }}>{commentCount} Comments</p>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <Link to={redirect}><button >expand</button></Link>
                    </Grid>
                </Grid>

            </Paper>
        )
    }
}

export default (Post);