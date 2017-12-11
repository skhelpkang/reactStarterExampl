
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import menuReducer from './layout/reducer/menuReducer';
import userReducer from './user/reducer/userReducer';

import sampleReducer from './sample/reducer/sampleReducer';


const rootReducer = combineReducers({
  //
  routing: routerReducer,

  menuState: menuReducer,
  userState: userReducer,

  sampleState: sampleReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);
