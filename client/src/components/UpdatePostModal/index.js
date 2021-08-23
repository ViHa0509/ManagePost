import { Button, Modal, TextareaAutosize, TextField } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import React from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { updatePost } from '../../redux/actions';

export default function UpdatePostModal(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = props.data;
    const [data, setData] = React.useState({
        id: post.id,
        title: post.title,
        content: post.content,
        attchment: post.attchment,
        like: post.like
    });

    const onClose = () => {
        props.onClose(false);
    };

    const onSubmit = React.useCallback(() => {
        dispatch(updatePost.updatePostRequest(data));
        onClose();
    }, [data, dispatch, onClose]);

    const body = (
        <div className={classes.paper} id='simple-modal-title'>
            <h2>Edit Post</h2>
            <form noValidate autoComplete='off' className={classes.form}>
                <img className={classes.image} src={data.attchment}/>
                <TextField className={classes.title}
                    required label='Title'
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                <TextareaAutosize className={classes.textarea}
                    rowsMin={5}
                    rowsMax={10}
                    placeholder='Content...'
                    value={data.content}
                    onChange={(e) => setData({ ...data, content: e.target.value })}
                />
                <FileBase64 accept='image/*'
                    multiple={false}
                    type='file'
                    value={data.attchment}
                    onDone={({ base64 }) => setData({ ...data, attchment: base64 })}
                />
                <div className={classes.footer}>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                        fullWidth
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
    return (
        <div>
            <Modal open={props.isShow} onClose={() => onClose()}>
                {body}
            </Modal>
        </div>
    );
}