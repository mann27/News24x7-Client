import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import './userstyle.css'
import { uploadUserImage } from '../../../redux/actions/userActions';

class UserDetails extends Component {

    constructor() {
        super();

        this.handleUserImage = this.handleUserImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUserImage() {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadUserImage(formData);
    }

    render() {
        const { user: { creds: { handle, imageUrl, email } } } = this.props;
        return (
            <div className="userstyle">
                <center>
                    <p className="heading">User Details</p>
                    <img src={imageUrl} alt="user" height={100} width={100} style={{ borderRadius: '50%' }} />
                    <input type="file" hidden="hidden" id="imageInput" onChange={this.handleChange} className="upload-file"></input>
                    <button className="upload-btn" onClick={this.handleUserImage}>upload</button>
                    <br />
                    <h3>@{handle}</h3>
                    <p>Email : {email}</p>
                </center>
            </div>
        )
    }
}

UserDetails.propTypes = {
    user: propTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapActionsToProps = {
    uploadUserImage
}

export default connect(mapStateToProps, mapActionsToProps)(UserDetails)
