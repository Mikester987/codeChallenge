import { Container } from 'reactstrap';
import PostsList from './blogPosts/PostsList';

const HomePage = () => {
    return (
        <Container>
            <PostsList />
        </Container>
    );
};

export default HomePage;