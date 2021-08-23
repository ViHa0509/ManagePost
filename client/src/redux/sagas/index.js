import {takeLatest, call, put} from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchPostSaga(action){
    try {
        const posts = yield call(api.fetchPosts);
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    } catch (err) {
        console.error(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
};

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload);
        yield put(actions.createPost.createPostSuccess(post.data));
    } catch (err) {
        console.error(err);
        yield put(actions.createPost.createPostFailure(err));
    }
};

function* updatePostSaga(action) {
    try {
        const updatedpost = yield call(api.updatePost, action.payload);
        yield put(actions.updatePost.updatePostSuccess(updatedpost.data));
    } catch (err) {
        console.error(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
};

function* deletePostSaga(action) {
    try {
        yield call(api.deletePost, action.payload);
        yield put(actions.deletePost.deletePostSuccess(action.payload));
    } catch (err) {
        console.error(err);
        yield put(actions.deletePost.deletePostFailure(err));
    }
};

function* fetchCommentSaga(action) {
    try {
        const comments = yield call(api.fetchComments, action.payload);
        yield put(actions.getComments.getCommentsSuccess(comments.data));
    }
    catch(err){
        console.error(err);
        yield put(actions.getComments.getCommentsFailure(err));
    }
};

function* createCommentSaga(action) {
    try {
        const comment = yield call(api.createComment, action.payload);
        yield put(actions.createComment.createCommentSuccess(comment.data));
    }
    catch(err){
        console.error(err);
        yield put(actions.createComment.createCommentFailure(err));
    }
};

function* mySaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
    yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
    yield takeLatest(actions.getComments.getCommentsRequest, fetchCommentSaga);
    yield takeLatest(actions.createComment.createCommentRequest, createCommentSaga);
};

export default mySaga;





