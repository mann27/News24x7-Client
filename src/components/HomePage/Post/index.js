import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
import copy from "copy-to-clipboard";

import './postStyle.css'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton';

class Post extends Component {

    constructor() {
        super();
        this.state = {
            copyText: '',
            reported: false
        }
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.handlereport = this.handlereport.bind(this);
    }

    copyToClipBoard = () => {
        const el = window.location.href + `post/${this.props.post.postId}`
        copy(el);
        this.setState({
            copyText: 'Copied!'
        })
    }

    handlereport(e) {
        this.setState({
            reported: true
        })
    }

    componentDidUpdate() {
        setTimeout(() => this.setState({ copyText: '' }), 3000);
    }

    render() {
        dayjs.extend(relativeTime)
        let { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId, postImage } = this.props.post;
        const redirect = `/post/${this.props.post.postId}`;
        return (
            <Paper style={{ marginTop: '25px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
                <Link to={redirect} className="link">
                    {/* <Grid container spacing={2} className="postshape">
                        <Grid item={true} xs={3} >
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <img src={userImage} alt="user" className="usershape" />
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: '10px' }}>
                                    <p className="handle" style={{marginBottom:"10px"}}> {handleName} </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true} xs={9} className="title"  >
                            <b style={{ marginBottom: '0px' }}>{title}</b>
                            <div className="time-tags">
                                <p style={{ fontSize: 'small' }}>{dayjs(createdAt).fromNow()}</p>
                                <p style={{ marginLeft: '20px', fontSize: 'medium', color: 'black' }}><u>{tags}</u></p>
                            </div>
                        </Grid>
                    </Grid> */}
                    <Grid container direction="row" justify="flex-start" style={{padding:'10px 10px',backgroundColor:'#E0EFFE'}}>
                        {/* user image and handle name*/}
                        <Grid xs={1} justify="flex-start">
                            <img src={userImage} alt="user" className="usershape" />
                        </Grid>
                        <Grid sx={6} direction="column" justify="flex-start" style={{paddingLeft:'10px',display:"flex"}}>
                            <p className="handle" style={{color:'#001272',fontSize:'20px',fontWeight:400,marginTop:'-10px'}}> {handleName} </p>
                            <p style={{ fontSize: 'small',marginTop:'-10px',opacity:'70%',fontSize:'10px'}}>{dayjs(createdAt).fromNow()}</p>
                        </Grid>
                    </Grid>
                    <hr style={{opacity:'30%'}}/>
                    <Grid contianer direction="row" >
                        {/* post title*/ }
                        <p style={{ fontFamily: 'Piazzolla',textAlign:"center",fontSize:'30px',fontWeight:800,color:'#001794' }}>{title}</p>
                    </Grid>
                </Link>
                {/* Image */}
                <div style={{textAlign:"center"}}>
                    {postImage ? <img src={postImage} style={{width:'100%' }}alt="img" className="postimage" /> : null}
                </div>
                {/* <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                        <a href={body} className="postbody">{body}</a>
                    </div> */}
                {/* tags */}
                <Grid container direction="row" justify="space-between">
                    <a href={body} style={{marginLeft:'20px'}}>Link</a>
                    <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px'}}><u>{tags}</u></p>
                </Grid>
                {/* likes and comments count */}
                <Grid container direction="row"  justify="flex-start" alignItems="center"> 
                    <LikeButton />
                    <p style={{fontSize:'14px'}}>{likeCount} </p>
                    <ChatIcon style={{marginLeft:'10px'}}/>
                    <p style={{fontSize:'14px'}}>{commentCount}</p>
                </Grid>
                <hr style={{opacity:'50%'}}/>
                {/* like,share ,comment,report symbols */}
                <Grid container spacing={3}>
                    <Grid item={true} xs={12}>
                        <div className="like-share-comment-bookmark">
                            <LikeButton key={postId} postId={postId} />
                            {/* <p>{likeCount} likes</p> */}

                            <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                            {/* <p style={{ marginLeft: '5px' }}>{commentCount} Comments</p> */}
                            {/* <p style={{ marginLeft:'-15px',fontSize:'14px' }}>{commentCount} Comments</p> */}
                            {this.state.copyText ? <p>{this.state.copyText}</p> : <span style={{cursor: 'pointer', color: '#08c'}} onClick={this.copyToClipBoard}><ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} /></span>}
                            {this.state.reported ? <p>reported!</p> : <ReportIcon onClick={this.handlereport} />}
                        </div>
                    </Grid>
                    {/* <Grid item={true} xs={3}>
                    </Grid> */}
                </Grid>
            </Paper >
        )
    }
}

export default (Post);
