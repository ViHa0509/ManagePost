import React from 'react'
import { Container } from '@material-ui/core';
import Header from '../components/Header';
import PostList from '../components/PostList';
import Newpost from '../components/Post/NewPost/NewPost';
import { useDispatch, useSelector } from 'react-redux';
import { postsState$ } from '../redux/selectors';
import * as actions from '../redux/actions';
export default function HomePage() {
    const posts = useSelector(postsState$);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
    }, [dispatch])

    const loadMore = (next) => {
        dispatch(actions.loadMorePost.loadMorePostRequest(next));
    };

    return (
    <Container maxWidth="lg" >
        <Header />
        <Newpost />
        { posts.data.length > 0 ?
            <PostList data={posts} loadMore={loadMore}/> : null
        }
    </Container>
    );
}