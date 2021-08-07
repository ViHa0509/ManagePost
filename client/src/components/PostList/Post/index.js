import React from 'react';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton,
    Typography
} from '@material-ui/core';
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/actions';
import DeleteConfirm from '../../ConfirmDialog';

export default function Post({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = React.useState(post);
    const [show, setShow] = React.useState(false);

    const onLikeBtnClick = React.useCallback(() => {
        dispatch(updatePost.updatePostRequest({ ...post, like: post.like + 1 }));
    }, [dispatch, post]);

    const onClose = (show) =>{
        setShow(show);
    }
    const onDeletePost = (post)=>{
        setData(post);
        setShow(true);
    };

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>{post.attchment}</Avatar>}
                title={post.author}
                subheader={moment(post.created_on).format('HH:MM MM DD,YYYY')}
                action={
                    <IconButton onClick={() => onDeletePost(post)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DeleteConfirm data={data} isShow={show} onClose={onClose}/>
            <CardMedia image={post.attchment} title='Title' className={classes.media} />
            <CardContent>
                <Typography variant='h5' color='textPrimary'>{post.title}</Typography>
                <Typography variant='body2' color='p' color='textSecondary'>{post.content}</Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <FavoriteIcon onClick={onLikeBtnClick} />
                    <Typography component="span" color="textSecondary">
                        {post.like} likes
                    </Typography>
                </IconButton>
            </CardActions>
        </Card>
    );
}