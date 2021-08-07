import {combineReducers} from 'redux';
import posts from './posts';
import modal from './modal';
import confirm from './confirm';

export default combineReducers({
    posts, 
    modal,
    confirm
});