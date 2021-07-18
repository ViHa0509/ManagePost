import {takeLatest, call, put} from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchPostSaga(action){
    try {
        const posts = yield call(api.fetchPosts);
        console.log('[post]', posts);
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    } catch (err) {
        console.error(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
};

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload);
        console.log('[createPostSaga - post]', post);
        yield put(actions.createPost.createPostSuccess(post.data));
    } catch (err) {
        console.error(err);
        yield put(actions.createPost.createPostFailure(err));
    }
};

function* updatePostSaga(action) {
    try {
        console.log({action});
        const updatedpost = yield call(api.updatePost, action.payload);
        console.log('[updatePostSaga - post]', updatedpost);
        yield put(actions.updatePost.updatePostSuccess(updatedpost.data));
    } catch (err) {
        console.error(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
};

function* deletePostSaga(action) {
    try {
        console.log({action});
        const deletepost = yield call(api.deletePost, action.payload);
        console.log({deletepost});
        yield put(actions.deletePost.deletePostSuccess(action.payload));
    } catch (err) {
        console.error(err);
        yield put(actions.deletePost.deletePostFailure(err));
    }
};

function* mySaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
    yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
};

export default mySaga;





