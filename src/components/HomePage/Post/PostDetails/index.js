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
