const blogPost = ({ post }) => {
    const { title, text, timestamp } = post;

    return (
        <div>
            <h2>{title}</h2>
            <h4>{timestamp}</h4>
            <hr></hr>
            <p>{text}</p>
        </div>
    );
};

export default blogPost;