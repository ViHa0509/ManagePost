import React from 'react';
import moment from 'moment';
import hachivi from '../../../../assets/hachivi.jpg';
import timeIcon from '../../../../assets/timeIcon.png';
import './Comment.css';
export default function Comment(props) {
    const comment = props.comment;
    const onDelete = () =>{
        props.onDelete(comment);
    }
    const style = {
        display: "flex"
    }
    return (
        <div style={style} className="comment">
            <div className="user-avatar">
                <img src={hachivi} alt="avatar"/>
            </div>
            <div className="div-table-cell user-details">
                <div className="div-table">
                    <div className="div-table-row user-name">
                        <div className="div-table-cell">Ha Chi Vi</div>
                    </div>
                    <div className="div-table-row post-time">
                        <img src={timeIcon}/>{moment(comment.created_on).format('HH:MM MM DD,YYYY')}
                    </div>
                    <div className="div-table-row news-view-comment-description">
                        <div className="div-table-cell">{comment.message}</div>
                    </div>
                </div>
            </div>
            <span className="delete-comment" onClick={onDelete}/>
        </div>
    );
}