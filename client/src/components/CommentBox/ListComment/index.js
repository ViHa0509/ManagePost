import React from 'react';
import Comment from './Comment';
import './ListComment.css';
export default function ListComment(props) {
    const comments = {...props.data};
    const onDelete = (data) => {
        props.onDelete(data);
    }
    return ( 
        <div className="comment-list">
            {comments.results.map((comment) => (
                <Comment key={comment.id} comment={comment} onDelete={onDelete} className="comment"/> 
            ))}
        </div>
    )
}