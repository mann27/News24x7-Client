import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import UserDetails from '../../UserDetails';
import UserDetailsSkleton from '../../../../utils/UserDetailsSkleton';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, submitComment, deletePost } from '../../../../redux/actions/dataActions';
import copy from "copy-to-clipboard";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
import Comment from '../../Comment';
import './postDetailsStyle.css'
import spin from '../../../../utils/black_spinner.gif';
import LikeButton from '../LikeButton';
import ReusablePost from  '../ReusablePost';


class PostDetails extends Component {

    constructor() {
        super();
        this.state = {
            commentbody: '',
            postId: '',
            errors: {},
            copyText: '',
            reported:false,

        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.handlereport = this.handlereport.bind(this);

    }
    handlereport(e) {
        this.setState({
            reported: true
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.post) {
            this.setState({
                postId: nextProps.data.post.postId
            })
        }
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ commentbody: '' });
        }
    }

    componentDidMount() {
        const url = window.location.href;
        // eslint-disable-next-line
        const result = url.match(/[^\/]+$/)[0];
        this.props.getPost(result);
    }

    handleOnChange(e) {
        this.setState({ commentbody: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitComment(this.state.postId, { body: this.state.commentbody })
    }

    showDelete = () => {
        if (this.props.user.authenticated)
            if (this.props.data.post.handleName === this.props.user.creds.handle) {
                return true;
            }
        return false;
    }

    onClickDelete = () => {
        this.props.deletePost(this.props.data.post.postId);
        this.props.history.push('/')
    }

    copyToClipBoard = () => {
        console.log("clicked copytoclipborad");
        const el = window.location.href + `/post/${this.props.data.post.postId}`
        copy(el);
        this.setState({
            copyText: 'Copied!'
        })
        // 
    }

    render() {

        const paperStyle={
            paddingLeft: '10px', 
            paddingRight: '10px', 
            paddingBottom: '10px' 
        }
        const { user: { authenticated } } = this.props;
        dayjs.extend(relativeTime)
        //const { data: { post: { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId, postImage } } } = this.props;
        const post = this.props.data.post;
        const { data: { post: { comments } } } = this.props;
        const commentMarkUp = comments ? (
            comments.map((comment) =>
                < Comment key={comment.id} comment={comment} />
            )
        ) : (<p> No comments yet</p>)

        const uiloading = this.props.ui.loading;
        return (
            <div style={{ backgroundColor:"rgba(238,238,238)", minHeight: 'calc(100vh - 138px)' }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing={1}>
                        <Grid item={true} xs={8}>
                            {!uiloading ? (
                                // <Paper style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                //     <Grid container spacing={3} className="postshape">
                                //         <Grid item={true} xs={3} >
                                //             <Grid container spacing={3}>
                                //                 <Grid item xs={4}>
                                //                     <img src={userImage} alt="user" className="usershape" />
                                //                 </Grid>
                                //                 <Grid item xs={8}>
                                //                     <p className="handle"> {handleName} </p>
                                //                 </Grid>
                                //             </Grid>
                                //         </Grid>
                                //         <Grid item={true} xs={9}  >
                                //             <div className="title">
                                //                 <b style={{ marginBottom: '0px' }}>{title}</b>
                                //             </div>
                                //             <div className="time-tags">
                                //                 <div className="time">
                                //                     <p>{dayjs(createdAt).fromNow()}</p>
                                //                 </div>
                                //                 <div className="tags">
                                //                     <p style={{ marginLeft: '20px', fontSize: 'medium' }}><u>{tags}</u></p>
                                //                 </div>
                                //             </div>
                                //         </Grid>
                                //     </Grid>
                                //     <center>
                                //         {postImage ? <img src={postImage} alt="img" className="postimage" /> : null}
                                //     </center>
                                //     <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                                //         <a href={body} className="postbody">{body}</a>
                                //     </div>
                                //     <div className="like-share-comment-bookmark">
                                //         <LikeButton key={postId} postId={postId} />
                                //         <p>{likeCount} likes</p>

                                //         <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                                //         <p style={{ marginLeft: '10px' }}>{commentCount} Comments</p>
                                //         {
                                //             authenticated && this.showDelete() ? <span className="delete-btn"><button type="button" onClick={this.onClickDelete}>delete</button></span> : null
                                //         }
                                //         {this.state.copyText ? <p>{this.state.copyText}</p> : <span style={{cursor: 'pointer', color: '#08c'}} onClick={this.copyToClipBoard}><ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} /></span>}
                                //         <ReportIcon />
                                //     </div>
                                // </Paper>
                                // <Paper style={{  paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
                                //     {/* <Link to={redirect} className="link"> */}
                                //         <Grid container direction="row" justify="flex-start" style={{padding:'10px 10px',backgroundColor:'#E0EFFE'}}>
                                //             {/* user image and handle name*/}
                                //             <Grid xs={1} justify="flex-start">
                                //                 <img src={userImage} alt="user" className="usershape" />
                                //             </Grid>
                                //             <Grid sx={6} direction="column" justify="flex-start" style={{paddingLeft:'10px',display:"flex"}}>
                                //                 <p className="handle" style={{color:'#001272',fontSize:'20px',fontWeight:400,marginTop:'-10px'}}> {handleName} </p>
                                //                 <p style={{ marginTop:'-10px',opacity:'70%',fontSize:'10px'}}>{dayjs(createdAt).fromNow()}</p>
                                //             </Grid>
                                //         </Grid>
                                //         <hr style={{opacity:'30%'}}/>
                                //         <Grid contianer direction="row" >
                                //             {/* post title*/ }
                                //             <p style={{ fontFamily: 'Piazzolla',textAlign:"center",fontSize:'30px',fontWeight:800,color:'#001794' }}>{title}</p>
                                //         </Grid>
                                //     {/* </Link> */}
                                //     {/* Image */}
                                //     <div style={{textAlign:"center"}}>
                                //         {postImage ? <img src={postImage} style={{width:'100%'}}alt="img" className="postimage" /> : null}
                                //     </div>
                                //     {/* tags */}
                                //     <Grid container direction="row" justify="space-between">
                                //         <a href={body} style={{marginLeft:'20px'}}>Link</a>
                                //         <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px'}}><u>{tags}</u></p>
                                //     </Grid>
                                //     {/* likes and comments count */}
                                //     <Grid container direction="row" spacing={4} alignItems="center">
                                //         <div style={{display:"flex"}}>
                                //             <LikeButton />
                                //             <p style={{fontSize:'14px',alignSelf:"center"}}>{likeCount} </p>
                                //         </div>
                                //         <div style={{display:"flex"}}>
                                //             <ChatIcon style={{marginLeft:'10px'}}/>
                                //             <p style={{fontSize:'14px',alignSelf:"center"}}>{commentCount}</p>
                                //         </div>
                                        
                                //         <div style={{display:"flex"}}>
                                //             {
                                //                 authenticated && this.showDelete() ? <span className="delete-btn"  ><button type="button" onClick={this.onClickDelete}>delete</button></span> : null
                                //             }
                                //         </div>
                                //     </Grid>
                                //     <hr style={{opacity:'50%'}}/>
                                //     {/* like,share ,comment,report symbols */}
                                //     <Grid container spacing={3}>
                                //         <Grid item={true} xs={12} >
                                //             <div className="like-share-comment-bookmark">
                                //                 <LikeButton key={postId} postId={postId} />
                                //                 <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                                //                 {this.state.copyText ? <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px',marginBottom:"5px"}}>{this.state.copyText}</p> : <span style={{cursor: 'pointer', color: '#08c'}} onClick={this.copyToClipBoard}><ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} /></span>}
                                //                 {this.state.reported ? <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px',marginBottom:"5px"}}>reported!</p> : <ReportIcon onClick={this.handlereport} />}
                                //             </div>
                                //         </Grid>
                                //     </Grid>
                                // </Paper >
                                <ReusablePost
                                    authenticated={authenticated}  paperStyle={paperStyle}
                                    post={post} copyText={this.state.copyText} reported={this.state.reported}  
                                    handleOnChange={() => this.handleOnChange()}
                                    handlereport={() => this.handlereport()}
                                    handleSubmit={() => this.handleSubmit()}
                                    showDelete={() => this.showDelete()}
                                    onClickDelete={() => this.onClickDelete()}
                                    copyToClipBoard={() => this.copyToClipBoard()}
                                    />
                            ) : (
                                    <Paper style={{ padding: '30px' }}>
                                        <center>
                                            <img src={spin} alt="loading..."></img>
                                        </center>
                                    </Paper>
                                )}
                            <Paper style={{ marginTop: '20px' }}>
                                <div className="comments">
                                    <h3>COMMENTS:</h3>
                                    {commentMarkUp}
                                    {authenticated ?
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="addCommentContainer">
                                                <input className="commentinp" type='text' value={this.state.commentbody} placeholder="add new comment" onChange={this.handleOnChange} />
                                                <button className="commentbtn" type="submit" >comment</button>
                                            </div>
                                        </form> : (
                                            <div className="comment-login">
                                                <p><Link to="/login">login</Link> or <Link to="/signup">signup</Link> to add an comment</p>
                                            </div>
                                        )}
                                </div>

                            </Paper>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper>
                                {!uiloading ?
                                    (authenticated ? <UserDetails /> :
                                        <p><Link to="/login">login</Link> to see your details</p>
                                    ) : <UserDetailsSkleton />}
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        )
    }
}

PostDetails.propTypes = {
    ui: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    data: propTypes.object.isRequired,
    getPost: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        user: state.user,
        data: state.data
    }
}

const mapActionsToProps = {
    getPost,
    submitComment,
    deletePost
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetails);
