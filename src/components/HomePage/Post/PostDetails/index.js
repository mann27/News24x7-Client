import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPost,
  submitComment,
  deletePost,
} from "../../../../redux/actions/dataActions";
import Comment from "../../Comment";
import "./postDetailsStyle.css";
import ReusablePost from "../ReusablePost";
import PostSkleton from "../../../../utils/PostSkleton";

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      commentbody: "",
      postId: "",
      errors: {},
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.post) {
      this.setState({
        postId: nextProps.data.post.postId,
      });
    }
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ commentbody: "" });
    }
  }

  componentDidMount() {
    const url = window.location.href;
    // eslint-disable-next-line
    const result = url.match(/[^\/]+$/)[0];
    this.props.getPost(result);
  }

  handleOnChange(e) {
    this.setState({ commentbody: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitComment(this.state.postId, {
      body: this.state.commentbody,
    });
  }

  showDelete = () => {
    if (this.props.user.authenticated)
      if (this.props.data.post.handleName === this.props.user.creds.handle) {
        return true;
      }
    return false;
  };

  onClickDelete = () => {
    this.props.deletePost(this.props.data.post.postId);
    this.props.history.push("/");
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;
    //const { data: { post: { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId, postImage } } } = this.props;
    const post = this.props.data.post;
    const {
      data: {
        post: { comments },
      },
    } = this.props;
    const commentMarkUp = comments ? (
      comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    ) : (
      <p className="NoCommentYet"> No comments yet</p>
    );

    const uiloading = this.props.ui.loading;
    return (
      <div
        style={{
          backgroundColor: "rgba(238,238,238)",
          minHeight: "calc(100vh - 138px)",
        }}
      >
        <div className="PostDetailContainer">
          <div className="PostDetailInnerBox">
            {!uiloading ? (
              <div className="PostDetailPostBox">
                <ReusablePost
                  authenticated={authenticated}
                  post={post}
                  handleOnChange={() => this.handleOnChange()}
                  handleSubmit={() => this.handleSubmit()}
                  showDelete={() => this.showDelete()}
                  onClickDelete={() => this.onClickDelete()}
                />
              </div>
            ) : (
              <Paper style={{ padding: "30px" }}>
                <center>
                  <PostSkleton />
                </center>
              </Paper>
            )}

            <div className="PostDetailCommentBox">
              {authenticated ? (
                <>
                  <h3 className="PostDetailPreHeading">COMMENTS</h3>
                  <form
                    onSubmit={this.handleSubmit}
                    className="PostDetailAddComment"
                  >
                    <div className="commentInputBox">
                      <input
                        className="PostDetailCommentInputBox"
                        type="text"
                        value={this.state.commentbody}
                        placeholder="Add Comment"
                        onChange={this.handleOnChange}
                      />
                      <button className="PostDetailSubmitButton" type="submit">
                        comment
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="PostDetailNotSignInPostPage">
                  <p>
                    <Link to="/login" className="PostDetailNotSignInLink">
                      login
                    </Link>{" "}
                    or{" "}
                    <Link to="/signup" className="PostDetailNotSignInLink">
                      signup
                    </Link>{" "}
                    to add a comment
                  </p>
                </div>
              )}
              <div className="PostDetailAllCommentBox">{commentMarkUp}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostDetails.propTypes = {
  ui: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  data: propTypes.object.isRequired,
  getPost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user,
    data: state.data,
  };
};

const mapActionsToProps = {
  getPost,
  submitComment,
  deletePost,
};

export default connect(mapStateToProps, mapActionsToProps)(PostDetails);
