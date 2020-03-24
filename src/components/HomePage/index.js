import React, { Component } from 'react'
import axios from 'axios'
import propTypes from 'prop-types';
import { Container, Grid, Paper } from '@material-ui/core'
import Post from './Post'
import UserDetails from './UserDetails'
import CreatePost from './CreatePost';
import colors from '../../utils/base-module'
import './homeStyle.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class HomePage extends Component {

    state = {
        posts: null
    }
    componentDidMount() {
        axios.get('/posts')
            .then(res => {
                this.setState({ posts: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { user: { authenticated } } = this.props
        let PostMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postId} post={post} />)
        ) : (<p>Loading...</p>);
        return (
            <div style={{ backgroundColor: colors.LIGHT_GREY }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item={true} xs={8}>
                            <Paper style={{ padding: '10px' }}>
                                <CreatePost />
                            </Paper>
                            <div style={{ marginTop: '20px' }}>
                                {PostMarkup}
                            </div>

                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper>
                                {authenticated ? <UserDetails /> :
                                    <p><Link to="/login">login</Link> to see your details</p>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

HomePage.propTypes = {
    user: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HomePage);