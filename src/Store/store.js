import { createStore, combineReducers, applyMiddleware } from 'redux';
import {addUserReducer,getDataReducer,createProfileReducer, getProfileReducer, addPostReducer,getPostReducer,delPostReducer,likePostReducer, repliesReducer, currentPostReducer
} from '../Reducer/reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  addUser: addUserReducer,
  storeData: getDataReducer,
  createProfile: createProfileReducer,
  profile: getProfileReducer,
  addPost: addPostReducer,
  getPost: getPostReducer,
  delPost: delPostReducer,
  likePost: likePostReducer,
  replies: repliesReducer,
  currentPost: currentPostReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
