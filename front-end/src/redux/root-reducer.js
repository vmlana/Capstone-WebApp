import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import userReducer from './user/user.reducer';

import * as History from "history";

const history = History.createBrowserHistory();


export const rootReducer = combineReducers({
    user: userReducer,
    router: connectRouter(history)
});