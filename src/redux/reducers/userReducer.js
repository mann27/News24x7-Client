import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USERPOSTS } from '../types';

const initialState = {
    authenticated: false,
    creds: {},
    likes: [],
    posts: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            }
        case SET_USERPOSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state
    }
}