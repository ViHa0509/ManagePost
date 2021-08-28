import React from 'react';
import {Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import MyEditor from '../MyEditor/MyEditor';
import postIcon from '../../../assets/post.svg';
import uploadImageIcon from '../../../assets/upload-image.svg';
import './NewPost.css';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../redux/actions';
import ReactFileReader from 'react-file-reader';
import PostPreview from '../PostPreview/PostPreview';
import hachivi from '../../../assets/hachivi.jpg';

export default function NewPost() {
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        title: '',
        content: '',
        attchment: '',
    });
    const handleFiles = (files) => {
        console.log(files);
        setData({
            ...data,
            attchment: files.base64
        })
    };
    const handleChange = (title) =>{
        setData({...data, title:title, content:title});
    };
    const clearData = () =>{
        setData({
            title: '',
            content:'',
            attchment:''
        })
    }
    const handlePostNews = React.useCallback(() =>{
        dispatch(createPost.createPostRequest(data));
        clearData();
    },[data, dispatch, clearData]);
    
    return (
        <div class="news-post">
            <Form horizontal noValidate id="NeewsPostForm" onSubmit={event => event.preventDefault()}>
                <Row className="news-post-row">
                    <Col xs={2} sm={2} className="news-post-avatar">
                        <img src={hachivi} alt=""/>
                    </Col>
                    <Col xs={10} sm={10} id="draft-editor">
                        <MyEditor placeholder='Post now...' handleChange={handleChange}/>
                    </Col>
                </Row>
                <div className="divide"></div>
                <div className="news-post-row news-post-btn">
                    <div className="news-post-drop-zone"> 
                        <ReactFileReader base64={true} handleFiles={handleFiles}>
                            <span className="news-post-upload-btn">
                                <img src={uploadImageIcon} alt=""/>
                                <p>Upload</p>
                            </span>
                        </ReactFileReader>
                    </div>
                    <FormGroup>
                        <Button
                            type="button"
                            className="btn-rounded" 
                            onClick={handlePostNews}
                            >
                            <img src={postIcon} alt="post-icon"/>
                            {'Post'}
                        </Button>
                    </FormGroup>
                </div>
            </Form>
            <PostPreview data={data} delePreview={clearData}/>
        </div>
    )
}