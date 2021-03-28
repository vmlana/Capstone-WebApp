import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from './root-reducer';

// import thunk from "redux-thunk";
import logger from "redux-logger";


const middlewares = [logger];

const store = process.env.NODE_ENV === "development" ? createStore(rootReducer, applyMiddleware(...middlewares)) : createStore(rootReducer);

export { store };