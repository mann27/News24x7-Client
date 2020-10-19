import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core'
import dayjs from 'dayjs';
//import relativeTime from 'dayjs/plugin/relativeTime';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
//import copy from "copy-to-clipboard";

import './postStyle.css'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton';

class ReusablePost extends Component{

  render(){
  
    let { userImage, handleName, title, body, likeCount, commentCount, createdAt, tags, postId, postImage } = this.props.post; //will be passed as props

    return(
      <Paper style={this.props.paperStyle}>
          <Link to={this.props.redirect} className="link">
              <Grid container direction="row" justify="flex-start" style={{padding:'10px 10px',backgroundColor:'#E0EFFE'}}>
                  {/* user image and handle name*/}
                  <Grid xs={1} justify="flex-start">
                      <img src={userImage} alt="user" className="usershape" />
                  </Grid>
                  <Grid sx={6} direction="column" justify="flex-start" style={{paddingLeft:'10px',display:"flex"}}>
                      <p className="handle" style={{color:'#001272',fontSize:'20px',fontWeight:400,marginTop:'-10px'}}> {handleName} </p>
                      <p style={{ marginTop:'-10px',opacity:'70%',fontSize:'10px'}}>{dayjs(createdAt).fromNow()}</p>
                  </Grid>
              </Grid>
              <hr style={{opacity:'30%'}}/>
              <Grid contianer direction="row" >
                  {/* post title*/ }
                  <p style={{ fontFamily: 'Piazzolla',textAlign:"center",fontSize:'30px',fontWeight:800,color:'#001794' }}>{title}</p>
              </Grid>
          </Link>
          {/* Image */}
          <div style={{textAlign:"center"}}>
              {postImage ? <img src={postImage} style={{width:'100%'}}alt="img" className="postimage" /> : null}
          </div>
          {/* tags */}
          <Grid container direction="row" justify="space-between">
              <a href={body} style={{marginLeft:'20px'}}>Link</a>
              <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px'}}><u>{tags}</u></p>
          </Grid>
          {/* likes and comments count */}
          <Grid container direction="row" spacing={4} alignItems="center" style={{margin:"10px"}}>
              <div style={{display:"flex"}}>
                  <LikeButton />
                  <p style={{fontSize:'14px',alignSelf:"center"}}>{likeCount} </p>
              </div>
              <div style={{display:"flex"}}>
                  <Link to={this.props.redirect} className="link">
                    <ChatIcon style={{marginLeft:'10px'}}/>
                  </Link >
                  <p style={{fontSize:'14px',alignSelf:"center"}}>{commentCount}</p>
              </div>
              
              <div style={{display:"flex"}}>
                  {
                      this.props.authenticated && this.props.showDelete() ? <span className="delete-btn"  ><button type="button" onClick={() => this.props.onClickDelete()}>delete</button></span> : null
                  }
              </div>
          </Grid>
          <hr style={{opacity:'50%'}}/>
          {/* like,share ,comment,report symbols */}
          <Grid container spacing={3}>
              <Grid item={true} xs={12} >
                  <div className="like-share-comment-bookmark">
                      <LikeButton key={postId} postId={postId} />
                      <Link to={this.props.redirect} className="link">
                        <ChatIcon style={{ marginLeft: '15px', marginRight: '0px' }} />
                      </Link>
                      {/* {this.props.copyText ? <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px',marginBottom:"5px"}}>{this.props.copyText}</p> : <span style={{cursor: 'pointer', color: '#08c'}} onClick={() => this.props.copyToClipBoard}><ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }} /></span>} */}
                      {this.props.copyText ? 
                        <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px',marginBottom:"5px"}}>
                          {this.props.copyText}</p>
                           : <span style={{cursor: 'pointer', color: '#08c'}}>
                              <ShareIcon style={{ marginLeft: '15px', marginRight: '0px' }}  onClick={() => this.props.copyToClipBoard()} />
                            </span>}
                      {this.props.reported ? <p style={{ fontSize: 'medium', color: '#3351F3' ,marginRight:'20px',marginBottom:"5px"}}>reported!</p> : <ReportIcon onClick={() => this.props.handlereport()} />}
                  </div>
              </Grid>
          </Grid>
      </Paper >
    )
  }
}

export default (ReusablePost);