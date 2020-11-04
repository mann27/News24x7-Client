import React, { Component } from "react";
import "./createPostStyle.css";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import TextFieldGroup from "./TextFieldGroup";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { createPost } from "../../../redux/actions/dataActions";

import { storage } from "../../../firebase";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      tags: "",
      errors: {},
      url: "",
      uploadmsg: "",
    };
    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onPostSubmit(e) {
    e.preventDefault();
    const postData = {
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags,
      imgurl: this.state.url,
    };
    console.log(postData);
    this.props.createPost(postData);
    this.setState({
      title: "",
      body: "",
      tags: "",
      url: "",
      uploadmsg: "",
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(event) {
    if (event.target.files[0]) {
      this.setState({ uploadmsg: "Uploading..." });
      const image = event.target.files[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress fn
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ url: url });
              this.setState({ uploadmsg: "Uploaded!" });
            });
        }
      );
    }
  }

  render() {
    const {
      user: { authenticated },
    } = this.props;
    const { errors, uploadmsg } = this.state;

    const {
      user: {
        creds: { handle },
      },
    } = this.props;

    return (
      <div className="post-form">
        {authenticated ? (
          <div>
            <div className="card-header">
              What's on your mind{`, ${handle} ?`}
            </div>
            <form onSubmit={this.onPostSubmit}>
              <div className="card-body">
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  type="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <div className="LinkBoxCreatePage">
                  <TextFieldGroup
                    placeholder="Enter your link here"
                    name="body"
                    value={this.state.body}
                    onChange={this.onChange}
                    error={errors.body}
                  />
                </div>
                <TextFieldGroup
                  placeholder="Add Tags seperated with a space"
                  name="tags"
                  type="text"
                  value={this.state.tags}
                  onChange={this.onChange}
                  error={errors.tags}
                />
                <div className="upload">
                  <div className="upload-box">
                    <input
                      type="file"
                      hidden="hidden"
                      id="imageInput"
                      onChange={this.handleChange}
                      className="upload-fileCreatePage post-pic"
                    ></input>
                    <p className="uplaod-msg">{uploadmsg}</p>
                    <div>
                      <button className="btn-post">POST</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="NotSignInPostPage">
            <p>
              {" "}
              <Link to="/login" className="NotSignInLink">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="NotSignInLink">
                Signup
              </Link>{" "}
              to create the post
            </p>
          </div>
        )}
      </div>
    );
  }
}

CreatePost.propTypes = {
  user: propTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  createPost,
};

export default connect(mapStateToProps, mapActionsToProps)(CreatePost);
