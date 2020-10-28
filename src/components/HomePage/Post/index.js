import React, { Component } from 'react'
//import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//import ChatIcon from '@material-ui/icons/Chat';
//import ShareIcon from '@material-ui/icons/Share';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
//import ReportIcon from '@material-ui/icons/Report';
import copy from "copy-to-clipboard";

import './postStyle.css'
//import { Link } from 'react-router-dom'
//import LikeButton from './LikeButton';
import ReusablePost from './ReusablePost';

class Post extends Component {

    constructor() {
        super();
        this.state = {
            copyText: '',
            reported: false
        }
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.handlereport = this.handlereport.bind(this);
    }

    copyToClipBoard = () => {
        const el = window.location.href + `post/${this.props.post.postId}`
        copy(el);
        this.setState({
            copyText: 'Copied!'
        })
    }

    handlereport(e) {
        this.setState({
            reported: true
        })
    }

    componentDidUpdate() {
        setTimeout(() => this.setState({ copyText: '' }), 3000);
    }

    render() {

        const paperStyle={ 
            marginTop: '25px', 
            paddingLeft: '10px', 
            paddingRight: '10px', 
            paddingBottom: '10px' 
        }
        dayjs.extend(relativeTime)
        
        const redirect = `/post/${this.props.post.postId}`; //will be passed as props
        return (

                <ReusablePost  
                    post={this.props.post} paperStyle={paperStyle}
                    redirect={redirect}
                    copyText={this.copyText} reported={this.reported}
                    handlereport={() => this.handlereport()}
                    copyToClipBoard={() => this.copyToClipBoard()} 
                    />
                    
        )
    }
}

export default (Post);
