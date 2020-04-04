import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
// import Post from '../HomePage/Post';
import { getUserPosts } from '../../redux/actions/userActions';
import { Container } from '@material-ui/core';
// import PostSkleton from '../../utils/PostSkleton';

class UserPage extends Component {

    // componentDidMount() {
    //     const name = window.location.href.split("/").pop();
    //     this.props.getUserPosts(name);
    // }

    render() {
        // const { data: { posts } } = this.props;
        const { user: { creds: { handle } } } = this.props;
        // const { ui: { loading } } = this.props;
        // const name = window.location.href.split("/").pop();
        // const userPostMarkup = !loading ? (posts.map(post => <Post key={post.postId} post={post} />)) :
        //     (<PostSkleton />)

        return (
            <Container xs="small">
                {/* {userPostMarkup} */}
                <h1> User details of {handle}</h1>
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