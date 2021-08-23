import {combineReducers} from 'redux';
import posts from './posts';
import modal from './modal';
import comments from './comments';

export default combineReducers({
    posts,
    comments,
    modal
});