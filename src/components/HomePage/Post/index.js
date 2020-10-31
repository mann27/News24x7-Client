import React, { Component } from "react";
import "./postStyle.css";
import ReusablePost from "./ReusablePost";

class Post extends Component {
  render() {
    const redirect = `/post/${this.props.post.postId}`; //will be passed as props
    return <ReusablePost post={this.props.post} redirect={redirect} />;
  }
}

export default Post;
