import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import './CommentForm.css';
import hachivi from '../../../assets/hachivi.jpg';
import postIcon from '../../../assets/post.svg';

export  default function CommentForm(props) {
  const post = props.post;
  const [data, setData] = React.useState({
    post_id:'',
    message: ''
  });
  const style = {
    maxHeight: '100px',
    minHeigh: '32px',
    resize: 'None',
  }
  const handleChange = (e) =>{
    setData({
      ...data,
      post_id: post.id,
      message: e.target.value
    });
  }
  const onSubmit = (e) =>{
    props.onSubmit(data);
    setData({message:''})
    e.preventDefault();
  };

  const onKeyDown = (e) =>{
    if (e.keyCode === 13 && e.shiftKey === false){
      onSubmit(e);
    }
  };
    
  return (
      <div className="post-news-comment">
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <div className="user-avatar">
              <img src={hachivi} alt=""/>
            </div>
            <textarea 
              className="form-control" 
              autoFocus
              rows={1} 
              placeholder='Write a comment ...'
              style={style}
              value={data.message} 
              onChange={handleChange}
              onKeyDown={onKeyDown}
            />
            <div className="post-comment-btn" onClick={onSubmit}>
                  <img src={postIcon} alt=""/>
            </div>
          </FormGroup>
        </Form>
      </div>
  );
} 