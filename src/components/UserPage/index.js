import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Post from "../HomePage/Post";
import PostSkleton from "../../utils/PostSkleton";
import { getUserPosts } from "../../redux/actions/dataActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./user.css";
import {
  UserPageContainer,
  UserPagePost,
  UserPageProfile,
  UserPageImg,
  UserPageInfo,
} from "./UserPage";
class UserPage extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const name = window.location.href.split("/").pop();
    console.log(name);
    this.props.getUserPosts(name);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      user: {
        creds: { handle, imageUrl, email, createdAt },
      },
    } = this.props;
    const {
      ui: { loading },
    } = this.props;
    const {
      data: { userposts },
    } = this.props;
    var userPostMarkup;
    var score = 0;
    if (userposts !== undefined) {
      userPostMarkup = !loading ? (
        userposts.map((post) => <Post key={post.postId} post={post} />)
      ) : (
        <PostSkleton />
      );
      userposts.map((post) => {
        if (post.handleName === window.location.href.split("/").pop()) {
          score += post.likeCount;
        }
        return null;
      });
    } else {
      userPostMarkup = <PostSkleton />;
    }
    return (
      <UserPageContainer className="UserPage">
        <UserPagePost>
          <center>
            <h1 className="handle-post">Your posts</h1>
          </center>
          <hr></hr>
          {userPostMarkup}
        </UserPagePost>
        <UserPageProfile>
          <UserPageImg>
            <img src={imageUrl} alt="user" className="img-user"></img>
          </UserPageImg>
          <UserPageInfo>
            <hr className="line"></hr>
            <h1 className="handle-user">{handle}</h1>
            <p className="user-email">{email}</p>
            <p className="user-cake">
              {" "}
              Cake Day : {dayjs(createdAt).format("dddd, MMMM D YYYY")}
            </p>
            <h3 className="score">Posts score : {score}</h3>
          </UserPageInfo>
        </UserPageProfile>
      </UserPageContainer>
    );
  }
}

UserPage.propTypes = {
  data: propTypes.object.isRequired,
  ui: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  getUserPosts: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    ui: state.ui,
    user: state.user,
  };
};
const mapActionsToProps = {
  getUserPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(UserPage);
