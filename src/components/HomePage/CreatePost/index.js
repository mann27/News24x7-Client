import React, { Component } from 'react'
import './createPostStyle.css'
import TextAreaFieldGroup from './TextAreaFieldGroup';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createPost } from '../../../redux/actions/dataActions';

class CreatePost extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      tags: '',
      errors: {}
    };
    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onPostSubmit(e) {
    e.preventDefault();
    const newpost = {
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags
    }
    this.props.createPost(newpost);
    this.setState({
      title: '',
      body: '',
      tags: ''
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { user: { authenticated } } = this.props
    const { errors } = this.state;
    return (
      <div className="post-form mb-3 shadow rounded mt-4">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          {authenticated ? (
            <div className="card-body">
              <form onSubmit={this.onPostSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="title"
                    name="title"
                    type="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <TextAreaFieldGroup
                    placeholder="Thoughts"
                    name="body"
                    value={this.state.body}
                    onChange={this.onChange}
                    error={errors.body}
                  />
                  <TextFieldGroup
                    placeholder="Add Tags seperated with a space"
                    name="tags"
                    type="text"
                    value={this.state.tags}
                    onChange={this.onChange}
                    error={errors.tags}
                  />
                </div>
                <button>
                  Submit
              </button>
              </form>
            </div>
          ) : <p> <Link to="/login">login</Link>  or <Link to="/signup">signup</Link> to create the post</p>}
        </div>
      </div>
    )
  }
}

CreatePost.propTypes = {
  user: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  createPost
}

export default connect(mapStateToProps, mapActionsToProps)(CreatePost);
