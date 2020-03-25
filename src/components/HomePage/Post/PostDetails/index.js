import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import UserDetails from '../../UserDetails';
import UserDetailsSkleton from '../../../../utils/UserDetailsSkleton';
import PostSkleton from '../../../../utils/PostSkleton';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../../../redux/actions/dataActions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Comment from '../../Comment';

class PostDetails extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        const url = window.location.href;
        const result = url.match(/[^\/]+$/)[0];
        this.props.getPost(result);
    }

    render() {
        const { user: { authenticated } } = this.props;
        dayjs.extend(relativeTime)
        const { data: { post: { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags } } } = this.props;
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
                                    <FavoriteIcon />
                                    <p>{likeCount} likes</p>
                                    <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                                    <p style={{ marginLeft: '10px' }}>{commentCount} Comments</p>
                                </div>
                            </Paper>
                            <Paper style={{ marginTop: '20px' }}>
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
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetails);