import React from 'react'
import { Container, Fab } from '@material-ui/core';
import Header from '../components/Header';
import PostList from '../components/PostList';
import Newpost from '../components/Post/NewPost/NewPost';
export default function HomePage() {
    return (
    <Container maxWidth="lg" >
        <Header />
        <Newpost />
        <PostList />
    </Container>
    );
}