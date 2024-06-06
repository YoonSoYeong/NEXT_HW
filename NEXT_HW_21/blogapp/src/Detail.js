import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function Detail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const imageRefs = useRef([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPost(savedPosts[id]);
    }, [id]);

    const handleImageClick = (index) => {
        const newHref = prompt('Enter new image URL:');
        if (newHref) {
            imageRefs.current[index].src = newHref;
            const updatedPost = { ...post };
            updatedPost.images[index] = newHref;
            setPost(updatedPost);
            const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            savedPosts[id] = updatedPost;
            localStorage.setItem('posts', JSON.stringify(savedPosts));
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="post-container">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <div>
                    {post.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Post Image ${index}`}
                            width="300"
                            ref={(el) => (imageRefs.current[index] = el)}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Detail;
