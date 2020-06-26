import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {

};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    ui: uiReducer
})

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;