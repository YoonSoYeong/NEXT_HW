import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Main() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([null, null, null]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAddPost = () => {
        const newPost = {
            title,
            content,
            images,
        };
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setTitle('');
        setContent('');
        setImages([null, null, null]);
    };

    const handleDeletePosts = () => {
        localStorage.removeItem('posts');
        setPosts([]);
    };

    return (
        <div className="container">
            <h1>오늘의 노래 추천</h1>
            <div>
                <h2>Add New MUSIC Post</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                {images.map((image, index) => (
                    <div key={index}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e.target.files[0])}
                        />
                        {image && <img src={image} alt={`Preview ${index}`} width="100" />}
                    </div>
                ))}
                <button onClick={handleAddPost}>Add Post</button>
                <button onClick={handleDeletePosts}>Delete All Posts</button>
            </div>
            {posts.map((post, index) => (
                <div className="post-container" key={index}>
                    <div key={index}>
                        <h2 className="post-h2">{post.title}</h2>
                        <p>{post.content}</p>
                        <div>
                            {post.images.map(
                                (image, imgIndex) =>
                                    image && (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Post ${index} Image ${imgIndex}`}
                                            width="100"
                                        />
                                    )
                            )}
                        </div>
                        <Link to={`/post/${index}`}>Read More</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Main;
