import React, { useState } from 'react';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton,
    Typography
} from '@material-ui/core';
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, showConfirm, updatePost } from '../../../redux/actions';
import DeleteConfirm from '../../ConfirmDialog';

export default function Post({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onLikeBtnClick = React.useCallback(() => {
        dispatch(updatePost.updatePostRequest({ ...post, like: post.like + 1 }));
    }, [dispatch, post]);

    const onOpenDeletePostConfirm = React.useCallback(()=>{
        dispatch(showConfirm({...post}));
    }, [dispatch]);

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>{post.attchment}</Avatar>}
                title={post.author}
                subheader={moment(post.created_on).format('HH:MM MM DD,YYYY')}
                action={
                    <IconButton onClick={onOpenDeletePostConfirm}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DeleteConfirm/>
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