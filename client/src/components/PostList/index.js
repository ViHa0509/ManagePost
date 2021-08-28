import React from 'react';
import { Grid } from "@material-ui/core";
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { postsState$ } from '../../redux/selectors';

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    React.useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
    }, [dispatch])

    return (
        posts.map( (post) => (
            <div className="news-post">
                <Post key={post.id} post={post} className='news-post-block'/>
            </div>
        ))
    );
}
