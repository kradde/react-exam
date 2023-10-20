import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPostRequest, getPostsRequest, getPostRequest } from '../api/posts';

const PostContext = createContext();

export const usePosts = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }

    return context;
};

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    const getPosts = useCallback(async (query) => {
        try {
            const res = await getPostsRequest(query);
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getPost = useCallback(async (id) => {
        try {
            const res = await getPostRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    return <PostContext.Provider value={{ posts, setPosts, isOnline, createPost, getPosts, getPost }}>{children}</PostContext.Provider>;
}
