import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Post from '../HomePage/Post';
import { Container } from '@material-ui/core';
import PostSkleton from '../../utils/PostSkleton';
import { getUserPosts } from '../../redux/actions/dataActions';
import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './user.css'
class UserPage extends Component {

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const name = window.location.href.split("/").pop();
        console.log(name);
        this.props.getUserPosts(name)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        dayjs.extend(relativeTime)
        const { user: { creds: { handle, imageUrl, email, createdAt } } } = this.props;
        const { ui: { loading } } = this.props;
        const { data: { userposts } } = this.props;
        var userPostMarkup;
        var score = 0;
        if (userposts !== undefined) {
            userPostMarkup = !loading ? (userposts.map((post) => <Post key={post.postId} post={post} />)) : (<PostSkleton />)
            userposts.map((post) => {
                if (post.handleName === window.location.href.split("/").pop()) {
                    score += post.likeCount;
                }
            });
        }
        else {
            userPostMarkup = <PostSkleton />
        }
        return (
            <Container xs="small" style={{ marginTop: '60px' }}>
                <Grid container>
                    <Grid item xs={4}>
                        <center>
                            <img src={imageUrl} alt="user image" className="img-user"></img>
                        </center>
                    </Grid>
                    <Grid item xs={8}>
                        <h1 className="handle-user">{handle}</h1>
                        <p className="user-email">{email}</p>
                        <p className="user-cake"> Cake Day : {dayjs(createdAt).format("dddd, MMMM D YYYY")}</p>
                        <h3 className="score">Posts score : {score}</h3>

                    </Grid>
                </Grid>
                <Container>
                    <center>
                        <h1 className="handle-user">Your posts</h1>
                    </center>
                    <hr></hr>
                    {userPostMarkup}
                </Container>
            </Container>
        )
    }
}

UserPage.propTypes = {
    data: propTypes.object.isRequired,
    ui: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    getUserPosts: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        ui: state.ui,
        user: state.user
    }
}
const mapActionsToProps = {
    getUserPosts
}

export default connect(mapStateToProps, mapActionsToProps)(UserPage);