import React, { Component } from 'react'
import './createPostStyle.css'
import TextAreaFieldGroup from './TextAreaFieldGroup';
import TextFieldGroup from './TextFieldGroup';

class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
          url:'',
          text:'',
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
      }

      onSubmit(e) {
        e.preventDefault();
        
        if(!this.props.auth.isAuthenticated) {
          this.props.history.push('/HomePage');
        }
    
        const { user } = this.props.auth;
    
        const newPost = {
          url: this.state.url,
    //      handle: this.state.handle,
          text: this.state.text,
          name: user.name,
            
        };
        console.log(this.props.auth);
    
        this.props.addPost(newPost);
        this.setState({ text: ''});
        this.setState({url: ''});
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    

    render() {
        const { errors } = this.state;
        return (
        <div className="post-form mb-3 shadow rounded mt-4">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextFieldGroup
                  placeholder="URL"
                  name="url"
                  type="url"
                  value={this.state.url}
                  onChange={this.onChange}
                  error={errors.url}
                />
                <TextAreaFieldGroup 
                  placeholder="Thoughts"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextFieldGroup
                  placeholder="Add Tags"
                  name="text"
                  type="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
             
              <button>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
        )
    }
}

export default CreatePost;
