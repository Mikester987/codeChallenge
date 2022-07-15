import { Col, Row } from 'reactstrap';
import BlogPost from './BlogPost';
import NewPostForm from './NewPostForm';
import { useSelector } from 'react-redux';
import {fetchPosts, updatePost, deleteOnePost, deletePosts } from './blogSlice';

const PostsList = ({  }) => {
    const posts = useSelector(fetchPosts());

    if (posts && posts.length > 0) {
        return (
            <Col md='5' className='m-1'>
                <h4>Posts</h4>
                {posts.map((post) => {
                    return <blogPost key={post.id} post={post} />;
                })}
                <NewPostForm />
            </Col>
        );
    }
    return (
        <Col md='5' className='m-1'>
            There are no posts for this blog yet.
        </Col>
    );
};

export default PostsList;