import React, { Component } from "react";
import { Paper, Grid, Avatar, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from "@material-ui/icons/Report";
import copy from "copy-to-clipboard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentIcon from "@material-ui/icons/InsertComment";

import "./postStyle.css";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
class Post extends Component {
  constructor() {
    super();
    this.state = {
      copyText: "",
      reported: false,
    };
    this.copyToClipBoard = this.copyToClipBoard.bind(this);
    this.handlereport = this.handlereport.bind(this);
  }

  copyToClipBoard = () => {
    const el = window.location.href + `post/${this.props.post.postId}`;
    copy(el);
    this.setState({
      copyText: "Copied!",
    });
  };

  handlereport(e) {
    this.setState({
      reported: true,
    });
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ copyText: "" }), 3000);
  }

  render() {
    dayjs.extend(relativeTime);
    let {
      userImage,
      handleName,
      title,
      body,
      likeCount,
      commentCount,
      createdAt,
      tags,
      postId,
      postImage,
    } = this.props.post;
    const redirect = `/post/${this.props.post.postId}`;
    return (
      <div className="PostPagePostContainer">
        <Link to={redirect} className="PostPageLink">
          <div className="PostPagePostHeader">
            {/* user image and handle name*/}
            <div className="PostPageUserShape">
              <Avatar src={userImage} alt={handleName} />
            </div>
            <div className="PostPageUserHandleHeader">
              <div className="PostPageUserHandleInfo">
                <p className="PostPageHandle"> {handleName} </p>
                <IconButton>
                  <MoreVertIcon className="PostPageMoreIcon" />
                </IconButton>
              </div>

              <p className="userHandleDate">{dayjs(createdAt).fromNow()}</p>
            </div>
          </div>

          <div className="PostPageTitle">
            {/* post title*/}
            {title}
          </div>
        </Link>
        {/* Image */}
        <div className="PostPageImgBox">
          {postImage ? (
            <img src={postImage} alt="img" className="PostPagePostImage" />
          ) : (
            <img style={{ display: "none" }} />
          )}
        </div>
        {/* tags */}
        <div className="PostPageLinkContainer">
          <a href={body} className="PostPagePostLink">
            Link to the post
          </a>
          <p className="PostPagePostTag">
            <span>Tags</span>
            {tags}
          </p>
        </div>
        {/* likes and comments count */}
        <div className="PostPageLikeBox">
          <div className="PostPageLike">
            <FavoriteIcon className="PostPageLikeButton" />
            <p>{likeCount}</p>
          </div>
          <div className="PostPageComment">
            <InsertCommentIcon className="PostPageCommentButton" />
            <p>{commentCount}</p>
          </div>
        </div>
        {/* like,share ,comment,report symbols */}
        <Grid container spacing={3}>
          <Grid item={true} xs={12}>
            <div className="like-share-comment-bookmark">
              <LikeButton key={postId} postId={postId} />
              <IconButton>
                <ChatIcon className="PostPageCommentButtonFooter" />
              </IconButton>

              {this.state.copyText ? (
                <p>{this.state.copyText}</p>
              ) : (
                <span
                  style={{ cursor: "pointer", color: "#08c" }}
                  onClick={this.copyToClipBoard}
                >
                  <IconButton>
                    <ShareIcon className="PostPageShareButtonFooter" />
                  </IconButton>
                </span>
              )}
              {this.state.reported ? (
                <p>reported!</p>
              ) : (
                <IconButton>
                  <ReportIcon
                    onClick={this.handlereport}
                    className="PostPageReportButtonFooter"
                  />
                </IconButton>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Post;
