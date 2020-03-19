import React, { Component } from 'react'
import axios from 'axios'
import { Container, Grid, Paper } from '@material-ui/core'
import Post from './Post'
import colors from '../../utils/base-module'
import './homeStyle.css';

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
        let PostMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postId} post={post} />)
        ) : (<p>Loading...</p>);
        return (
            <div style={{ backgroundColor: colors.LIGHT_GREY }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item={true} xs={8}>
                            <Paper style={{ padding: '10px' }}>
                                <input name="new post" className="add-new-post" placeholder="Create Post"></input>
                            </Paper>
                            {PostMarkup}
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper>
                                <h1>XTRA</h1>
                                <p>User profile</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default HomePage;