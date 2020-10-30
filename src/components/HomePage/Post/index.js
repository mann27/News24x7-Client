import React, { Component } from "react";
import "./postStyle.css";
import ReusablePost from "./ReusablePost";

class Post extends Component {
  render() {
    const paperStyle = {
      marginTop: "25px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingBottom: "10px",
    };
    const redirect = `/post/${this.props.post.postId}`; //will be passed as props
    return (
      <ReusablePost
        post={this.props.post}
        paperStyle={paperStyle}
        redirect={redirect}
      />
    );
  }
}

export default Post;
