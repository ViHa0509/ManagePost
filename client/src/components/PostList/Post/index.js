import React from 'react';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, MenuItem,
    Typography, Menu
} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/actions';
import DeleteConfirm from '../../ConfirmDialog';
import UpdatePostModal from '../../UpdatePostModal';

export default function Post({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = React.useState(post);
    const [showEdit, setShowEdit] = React.useState(false);
    const [showDel, setShowDel] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onLikeBtnClick = React.useCallback(() => {
        dispatch(updatePost.updatePostRequest({ ...post, like: post.like + 1 }));
    }, [dispatch, post]);
    const onClose = (show) => {
        setShowEdit(show);
        setShowDel(show);
    }
    const onDeletePost = (post) => {
        setData(post);
        setShowDel(true);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onUpdatePost = (post) => {
        setData(post);
        setShowEdit(true);
    }
    const onSelect = (props) => {
        if (props.choice === 'delete') {
            onDeletePost(props.post);
        } else {
            onUpdatePost(props.post);
        };
        handleClose();
    }
    return (
        <Card>
            <CardHeader
                avatar={<Avatar>{post.attchment}</Avatar>}
                title={post.author}
                subheader={moment(post.created_on).format('HH:MM MM DD,YYYY')}
                action={
                    <div style={{ marginLeft: "40%" }}>
                        <IconButton aria-haspopup="true" aria-controls="long-menu" onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                        <Menu open={open} anchorEl={anchorEl} keepMounted onClose={handleClose}>
                            <MenuItem onClick={() => onSelect({ choice: 'delete', post: post })} ><DeleteIcon /></MenuItem>
                            <MenuItem onClick={() => onSelect({ choice: 'edit', post: post })}><EditIcon /></MenuItem>
                        </Menu>
                    </div>
                }
            />
            <UpdatePostModal data={data} isShow={showEdit} onClose={onClose} />
            <DeleteConfirm data={data} isShow={showDel} onClose={onClose} />
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