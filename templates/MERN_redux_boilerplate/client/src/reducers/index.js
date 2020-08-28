import { combineReducers } from 'redux';
// import postReducer from './postReducer';
import testReducer from './testReducer';

export default combineReducers({
    // posts: postReducer
    test: testReducer
});