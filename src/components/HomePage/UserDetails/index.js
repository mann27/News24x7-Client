import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types'

class UserDetails extends Component {
    render() {
        const { user: { creds: { handle, imageUrl, email } } } = this.props;
        return (
            <div>
                <center>
                    <h2>User Details</h2>
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
