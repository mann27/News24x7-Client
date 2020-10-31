import React, { Component } from "react";

import "./commentStyle.css";

export default class Comment extends Component {
  render() {
    return (
      <div className="CommentSectionContainer">
        <h3 className="CommentSectionHandle">
          {this.props.comment.userHandle}:{" "}
        </h3>
        <p className="CommentSectionCommentBody">{this.props.comment.body}</p>
      </div>
    );
  }
}
