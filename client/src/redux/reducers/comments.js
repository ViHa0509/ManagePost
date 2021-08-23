import { createComments } from "../../api";
import { INIT_STATE } from "../../constant";
import { getComments, createComment, getType } from "../actions";

export default function commentsReducers(state = INIT_STATE.comments, action){
    switch(action.type){
        case getType(getComments.getCommentsRequest):
            return{
                ...state,
                isLoading: true,
            };
        case getType(getComments.getCommentsSuccess):
            return{
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getComments.getCommentsFailure):
            return{
                ...state,
                isLoading: false,
            };
        case getType(createComment.createCommentSuccess):
            return{
                ...state, 
                data: [...state.data, action.payload],
            };
        default:
            return state;
    }
}