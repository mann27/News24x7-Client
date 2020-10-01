const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const { helloWorld } = require('./handlers/helloworld');
const { getUsers, login, signup, getAuthUser, uploadUserImage } = require('./handlers/users');
const {
    getAllPosts,
    addNewPost,
    getPost,
    addCommentToPost,
    likePost,
    unlikePost,
    deletePost,
    report,
    getAllPostsMostLiked, getAllPostsTrending
} = require('./handlers/posts');

const FBAuth = require('./utils/FBAuth'); // Firebase Auth Middleware

app.get('/hello', FBAuth, helloWorld); // use it like this.. Add [Bearer token] in Authorization req header
//so that this can only be accessed by authenticated(logged in) users

// post routes
app.get('/posts', getAllPosts);
app.get('/postsml', getAllPostsMostLiked);
app.get('/postt', getAllPostsTrending);
app.post('/newpost', FBAuth, addNewPost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', FBAuth, addCommentToPost);
app.delete('/post/:postId', FBAuth, deletePost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/report', FBAuth, report);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

app.get('/users', getUsers);
app.get('/user', FBAuth, getAuthUser);
app.post('/login', login);
app.post('/signup', signup);
app.post('/user/image', FBAuth, uploadUserImage);
// Password for login use 123456


// API endpoint
// https://asia-east2-news-sen3.cloudfunctions.net/api/

exports.api = functions.region('asia-east2').https.onRequest(app);
