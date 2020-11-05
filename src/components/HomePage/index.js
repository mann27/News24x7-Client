import React, { Component } from "react";
import propTypes from "prop-types";
import Post from "./Post";
import UserDetails from "./UserDetails";
import CreatePost from "./CreatePost";
import PostSkleton from "../../utils/PostSkleton";
import UserDetailsSkleton from "../../utils/UserDetailsSkleton";
import "./homeStyle.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";
import Ad from "./advertisment/Ad";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      type: "r",
    };
  }
  componentDidMount() {
    if (
      typeof this.props.data.posts !== "undefined" &&
      this.props.data.posts.length > 0
    ) {
    } else this.props.getPosts(this.state.type);
  }

  onClickType = (ty) => {
    console.log(ty);
    this.props.getPosts(ty);
    this.props.history.push("/");
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;
    const {
      data: { posts, loading },
    } = this.props;
    const uiloading = this.props.ui.loading;
    let PostMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkleton />
    );
    return (
      <div className="HomePageContainer">
        <div className="HomePageRecentMenu">
          <button
            type="button"
            className="sortPostButton"
            onClick={() => this.onClickType("r")}
          >
            Recent
          </button>
          <button
            className="sortPostButton"
            type="button"
            onClick={() => this.onClickType("ml")}
          >
            Most Liked
          </button>
          <button
            type="button"
            className="sortPostButton"
            onClick={() => this.onClickType("t")}
          >
            Trending
          </button>
        </div>
        <div className="HomePageBox">
          <div className="HomePageUserDetailSection">
            {!uiloading ? (
              authenticated ? (
                <UserDetails />
              ) : (
                <div className="NotSignInPost">
                  <p>
                    <Link to="/login" className="NotSignInLink">
                      login
                    </Link>{" "}
                    to see your details
                  </p>
                </div>
              )
            ) : (
              <UserDetailsSkleton />
            )}

            <center className="btn-select sortPost">
              <p>Sort the posts by</p>
              <button
                type="button"
                className="sortPostButton"
                onClick={() => this.onClickType("r")}
              >
                Recent
              </button>
              <button
                className="sortPostButton"
                type="button"
                onClick={() => this.onClickType("ml")}
              >
                Most Liked
              </button>
              <button
                type="button"
                className="sortPostButton"
                onClick={() => this.onClickType("t")}
              >
                Trending
              </button>
            </center>
          </div>
          <div className="HomePageCreatePostSection">
            <CreatePost />

            <div style={{ marginTop: "20px" }}>{PostMarkup}</div>
          </div>
          <div className="HomePageSortAndAdSection">
            <Ad key={Math.random() * 5} />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: propTypes.object.isRequired,
  data: propTypes.object.isRequired,
  ui: propTypes.object.isRequired,
  getPosts: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    data: state.data,
    ui: state.ui,
  };
};

const mapActionsToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
