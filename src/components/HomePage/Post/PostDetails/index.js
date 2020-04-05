import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import UserDetails from '../../UserDetails';
import UserDetailsSkleton from '../../../../utils/UserDetailsSkleton';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, submitComment } from '../../../../redux/actions/dataActions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import Comment from '../../Comment';
import './postDetailsStyle.css'
import spin from '../../../../utils/black_spinner.gif';
import LikeButton from '../LikeButton';


class PostDetails extends Component {

    constructor() {
        super();
        this.state = {
            commentbody: '',
            postId: '',
            errors: {}
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        const { user: { authenticated } } = this.props;
        dayjs.extend(relativeTime)
        const { data: { post: { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId } } } = this.props;
        const { data: { post: { comments } } } = this.props;
        const commentMarkUp = comments ? (
            comments.map((comment) =>
                < Comment key={comment.id} comment={comment} />
            )
        ) : (<p> No comments yet</p>)

        const uiloading = this.props.ui.loading;
        return (
            <div style={{ backgroundColor: '#EEEEEE' }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item={true} xs={8}>
                            {!uiloading ? (
                                <Paper>
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
                                    <div className="like-comment">
                                        <LikeButton key={postId} postId={postId} />
                                        <p>{likeCount} likes</p>
                                        <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                                        <p style={{ marginLeft: '10px' }}>{commentCount} Comments</p>
                                    </div>
                                </Paper>
                            ) : (
                                    <Paper style={{ padding: '30px' }}>
                                        <center>
                                            <img src={spin} alt="loading..."></img>
                                        </center>
                                    </Paper>
                                )}
                            <Paper style={{ marginTop: '20px' }}>
                                <h3>COMMENTS:</h3>
                                {authenticated ?
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="addCommentContainer">
                                            <input className="commentinp" type='text' value={this.state.commentbody} placeholder="add new comment" onChange={this.handleOnChange} />
                                            <button className="commentbtn" type="submit" >comment</button>
                                        </div>
                                    </form> : (
                                        <center>
                                            <p><Link to="/login">login</Link> or <Link to="/signup">signup</Link> to add an comment</p>
                                        </center>
                                    )}
                                {commentMarkUp}
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
    submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetails);