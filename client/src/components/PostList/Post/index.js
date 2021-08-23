import React, { useEffect } from 'react';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, MenuItem,
    Typography, Menu
} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/actions';
import DeleteConfirm from '../../ConfirmDialog';
import UpdatePostModal from '../../UpdatePostModal';
import * as api from '../../../api';
import { CommentBoxStyle } from '../../CommentBox/styles';
import CommentForm from '../../CommentBox/CommentForm';
import ListComment from '../../CommentBox/ListComment';

export default function Post({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = React.useState(post);
    const [showCmtBox, setShowCmtBox] = React.useState(false);
    const [comments, setComments] = React.useState();
    const [postCmt, setPostCmt] = React.useState();
    const [showEdit, setShowEdit] = React.useState(false);
    const [showDel, setShowDel] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [comment_count, setComment_count] = React.useState(post.comment_count);
    const [like_count, setLike_count] = React.useState(post.like);
    const onLikeBtnClick = (post) => {
        const newPost = post;
        newPost.like = newPost.like + 1;
        setData(newPost);
        setLike_count(newPost.like);
        api.updatePost(data).then().catch(() => { });
    }
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
    };
    const onSelect = (props) => {
        if (props.choice === 'delete') {
            onDeletePost(props.post);
        } else {
            onUpdatePost(props.post);
        };
        handleClose();
    };

    const showCommentBox = (post) => {
        if (!showCmtBox) {
            api.fetchComments(post).then(
                (res) => {
                    const comments = Object.assign([], [res.data]);
                    setComments(comments[0]);
                    setShowCmtBox(!showCmtBox);
                    setPostCmt(post);
                }
            ).catch((err) => { throw (err) });
        } else {
            setShowCmtBox(!showCmtBox);
        }
    };
    const onCreateComment = (data) => {
        if (data.message !== '') {
            api.createComment(data).then(
                (comment) => {
                    const newComments = comments;
                    newComments.results = [...newComments.results, comment.data];
                    newComments.count = newComments.count + 1;
                    setComments(newComments);
                    setComment_count(newComments.count);
                }
            ).catch(() => { });
        }
    }
    const onDeleteComment = (comment) => {
        api.deleteComment(comment).then(
            () => {
                const newComments = comments;
                newComments.results = newComments.results.filter(cmt => cmt.id !== comment.id);
                newComments.count = newComments.count - 1;
                setComments(newComments);
                setComment_count(newComments.count);
            }
        ).catch(() => { });
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
                    <FavoriteIcon onClick={() => onLikeBtnClick(post)} />
                    {/* onClick={() => onLikeBtnClick(post)} /> */}
                    <Typography component="span" color="textSecondary">
                        {like_count}
                    </Typography>
                </IconButton>
                <IconButton>
                    <ChatBubbleOutlineIcon onClick={() => showCommentBox(post)} />
                    <Typography component="span" color="textSecondary">
                        {comment_count}
                    </Typography>
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </CardActions>
            {showCmtBox ?
                <CommentBoxStyle>
                    <CommentForm post={postCmt} onSubmit={onCreateComment} />
                    <ListComment data={comments} onDelete={onDeleteComment} />
                </CommentBoxStyle>
                : null}
        </Card>
    );
}