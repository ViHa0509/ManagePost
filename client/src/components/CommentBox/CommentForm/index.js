import React from 'react';
import {CommentFormStyle, CommentFormField, CommentFormAction, ButtonPostComment, 
    InputComment, TextAreaComment
} from '../styles';
export  default function CommentForm(props) {
  const post = props.post;
  const [data, setData] = React.useState({
    post_id:'',
    message: ''
  });
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
      <CommentFormStyle onSubmit={onSubmit}>
        <CommentFormField>
          {/* <InputComment placeholder="Name" ></InputComment><br /> */}
          <TextAreaComment 
            placeholder="Comment" 
            value={data.message} 
            onChange={handleChange}
            onKeyDown={onKeyDown}
            />
        </CommentFormField>
        <CommentFormAction>
          <ButtonPostComment type="submit" >Post Comment</ButtonPostComment>
        </CommentFormAction>
      </CommentFormStyle>
  );
} 