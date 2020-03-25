import { SET_POST, SET_POSTS, LOADING_DATA, LOADING_UI, UNLOADING_UI } from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        })
}

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: UNLOADING_UI });
        })
        .catch((err) => console.log(err));
};