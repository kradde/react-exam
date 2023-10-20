import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostsContext';
import Post from '../components/Post';
import { Link, useSearchParams } from 'react-router-dom';
import OnlineSign from '../components/onlineSign';

function HomePage() {
    const [search, setSearch] = useState('');
    const { getPosts, posts, isOnline } = usePosts();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('q') || '';
        setSearch(query);
        if (isOnline) {
            getPosts(query);
        }
    }, [isOnline, getPosts, searchParams]);

    return (
        <div className="sm:container mx-4 sm:mx-auto my-10">
            <form className="mb-6" action="">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-white">
                    Busqueda
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        name="q"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full p-4 pl-10 text-sm border rounded-lg bg-zinc-700 border-zinc-700 placeholder-zinc-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar por título, autor o contenido..."
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                        Buscar
                    </button>
                </div>
            </form>
            <OnlineSign />
            <div className="bg-zinc-800 p-5 sm:p-10 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Entradas</h3>
                    <Link
                        to="new-post"
                        className="relative  p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium
                    text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600
                    hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    >
                        <div className="inline-flex items-center justify-center px-5 py-2.5 relative transition-all ease-in duration-75 bg-zinc-800 rounded-md group-hover:bg-opacity-0">
                            <svg className="w-3.5 h-3.5 mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"
                                />
                            </svg>
                            <span>Nueva entrada</span>
                        </div>
                    </Link>
                </div>
                {posts.map((post) => (
                    <Post id={post._id} title={post.title} author={post.author} date={post.date} content={post.content} key={post._id} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
