import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { useParams } from 'react-router-dom';
import { formatDate } from '../helpers/formatHelpers';

function PostPage() {
    const [post, setPost] = useState({});
    const { getPost, setPosts, posts, isOnline } = usePosts();
    const params = useParams();

    useEffect(() => {
        async function loadPost() {
            if (params.id) {
                if (isOnline) {
                    const post = await getPost(params.id);
                    setPost(post);
                    const newPosts = posts.map((p) => {
                        if (p._id === params.id) {
                            p.content = post.content;
                        }
                        return p;
                    });
                    setPosts(newPosts);
                } else {
                    setPost(posts.find((p) => p._id === params.id));
                }
            }
        }
        loadPost();
    }, [getPost, params, setPosts]);

    return !post ? (
        <div className="bg-zinc-800 sm:container mx-4 sm:mx-auto my-10 p-5 sm:p-10 rounded-md">
            <h3 className="text-2xl font-bold mb-4">Cargando...</h3>
        </div>
    ) : (
        <div className="bg-zinc-800 sm:container mx-4 sm:mx-auto my-10 p-5 sm:p-10 rounded-md">
            <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
            <p className="italic text-sm mb-3 font-normal text-zinc-400">
                {post.author} - {formatDate(post.date)}
            </p>
            <div className="whitespace-pre-line mt-6 bg-zinc-700 text-white rounded-md p-6">{post.content}</div>
        </div>
    );
}

export default PostPage;
