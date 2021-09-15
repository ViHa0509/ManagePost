import React from 'react';
import Post from './Post';
import './PostList.css';

export default function PostList(props) {
    console.log('0000',props.data);
    const [result, setResult] = React.useState(props.data);
    React.useEffect(() => {
        setResult(props.data)
    }, [props.data.isLoading]);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [result])

    const handleScroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {
            if(result){
                loadMore(result.next);
            }
        }};

    const loadMore = (next) => {
        if(next !== '' ){
            props.loadMore(next)
        }
    };

    return (
        <div>
            <div>
                {result && result.data.map((post) => {
                    return (
                        <div key={post.id} className="news-post">
                            <Post post={post} className='news-post-block' />
                        </div>
                    )
                })
                }
            </div>
            <div className="post-load-more">
                {result && result.isLoading ? (
                    <div className="load-more">LOADING...</div>
                ) : null}
            </div>
        </div>
    );
}
