import React, { Component } from 'react';
import MyButton from '../../../utils/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../redux/actions/dataActions';

export class LikeButton extends Component {

    constructor() {
        super();
        this.state = {
            yes: "like",
            no: "undo like"
        }
    }

    likedPost = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.postId === this.props.postId
            )
        ) {
            return true;
        }
        else {
            return false;
        }
    };
    likePost = () => {
        this.props.likePost(this.props.postId);
        if (this.likedPost()) {
            this.setState({
                yes: "like",
                no: "undo like"
            })
        }
        else {
            this.setState({
                yes: "undo like",
                no: "like"
            })
        }
    };
    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
        if (this.likedPost()) {
            this.setState({
                yes: "undo like",
                no: "like"
            })
        }
        else {
            this.setState({
                yes: "like",
                no: "undo like"
            })
        }
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : this.likedPost() ? (
            <MyButton tip={this.state.no} onClick={this.unlikePost}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
                    <MyButton tip={this.state.yes} onClick={this.likePost}>
                        <FavoriteBorder color="primary" />
                    </MyButton>
                );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LikeButton);
