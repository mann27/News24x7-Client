import React, { Component } from "react";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import copy from "copy-to-clipboard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./postStyle.css";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
class ReusablePost extends Component {
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

  render() {
    const {
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
    } = this.props.post; //will be passed as props
    dayjs.extend(relativeTime);

    return (
      <div className="PostPagePostContainer">
        <Link to={this.props.redirect} className="PostPageLink">
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
          <div className="PostPageTitleBox">
            <div className="PostPageTitle">
              {/* post title*/}
              {title}
            </div>
            <div>
              {this.props.authenticated && this.props.showDelete() ? (
                <span className="PostPageDeleteBox">
                  <IconButton>
                    <DeleteForeverIcon
                      className="PostPageDeleteButton"
                      onClick={() => this.props.onClickDelete()}
                    />
                  </IconButton>
                </span>
              ) : null}
            </div>
          </div>
        </Link>
        {/* Image */}
        <div className="PostPageImgBox">
          {postImage ? (
            <img src={postImage} alt="post-img" className="PostPagePostImage" />
          ) : (
            <img alt="post-img" style={{ display: "none" }} />
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

              <Link to={this.props.redirect} className="link">
                <IconButton>
                  <ChatIcon className="PostPageCommentButtonFooter" />
                </IconButton>
              </Link>

              {this.state.copyText ? (
                <p
                  style={{
                    fontSize: "medium",
                    color: "#3351F3",
                    marginRight: "20px",
                    marginBottom: "5px",
                  }}
                >
                  {this.state.copyText}
                </p>
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
                <p
                  style={{
                    fontSize: "medium",
                    color: "#3351F3",
                    marginRight: "20px",
                    marginBottom: "5px",
                  }}
                >
                  reported!
                </p>
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

export default ReusablePost;
