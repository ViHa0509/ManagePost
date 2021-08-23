import React from 'react';
import { CommentBody, CommentDiv, CommentHeader, DeleteButton, 
    AuthorComment, CommonDiv, CommonDivOne, CommentTime } from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
export default function Comment(props) {
    const comment = props.comment;
    const onDelete = () =>{
        props.onDelete(comment);
    }
    return (
        <CommentDiv>
            <CommentHeader>
                <CommonDiv>
                    <AuthorComment><CommentTime/>{moment(comment.created_on).format('HH:MM MM DD,YYYY')}</AuthorComment>
                </CommonDiv>
                <CommonDivOne>
                    <DeleteButton onClick={onDelete}><DeleteIcon /></DeleteButton>
                </CommonDivOne>
            </CommentHeader>
            <CommentBody>- {comment.message}</CommentBody>
        </CommentDiv>
    );
}