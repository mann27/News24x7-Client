import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import './userstyle.css'
class UserDetails extends Component {
    render() {
        const { user: { creds: { handle, imageUrl, email } } } = this.props;
        return (
            <div className="userstyle">
                <center>
                    <p className="heading">User Details</p>
                    <img src={imageUrl} alt="user" height={100} width={100} style={{ borderRadius: '50%' }} />
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

export default connect(mapStateToProps)(UserDetails)
