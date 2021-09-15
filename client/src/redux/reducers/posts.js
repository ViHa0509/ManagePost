import { INIT_STATE } from '../../constant';
import { getPosts, getType, updatePost, createPost, deletePost, loadMorePost } from '../actions';

export default function postsReducers(state = INIT_STATE.posts, action) {
    switch(action.type) {
        case getType(getPosts.getPostsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getPosts.getPostsSuccess):
            return{
                ...state, 
                isLoading: false,
                next: action.payload.next,
                data: action.payload.results,
            };
        case getType(getPosts.getPostsFailure):
            return{
                ...state,
                isLoading:false,
            };
        case getType(createPost.createPostSuccess):
            return{
                ...state, 
                data: [action.payload, ...state.data],
            };
        case getType(updatePost.updatePostSuccess):
            return{
                ...state, 
                data: state.data.map(post => post.id === action.payload.id ? action.payload : post),
            };
        case getType(deletePost.deletePostSuccess):
            return{
                ...state, 
                data: state.data.filter(post => post.id !== action.payload.id),
            };
        case getType(loadMorePost.loadMorePostRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(loadMorePost.loadMorePostSuccess):
            const newData = action.payload.results;
            const { data } = state;
            return {
                ...state,
                isLoading: false,
                next: action.payload.next,
                data: [...data, ...newData],
            };
        case getType(loadMorePost.loadMorePostFailure):
            return {
                ...state,
                error: action.payload,
                next: action.next,
                isLoading: false,
            };
        default:
            return state;
    }
}