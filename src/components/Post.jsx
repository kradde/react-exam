import { Link } from 'react-router-dom';
import { formatDate, formatContent } from '../helpers/formatHelpers';

function Post({ id, title, author, date, content }) {
    return (
        <div className="p-6 rounded-lg shadow bg-zinc-700 border-zinc-600 mb-5">
            <Link to={'post/' + id}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{title}</h5>
            </Link>
            <p className="mb-2 font-normal text-zinc-400">{formatContent(content)}</p>
            <p className="italic text-xs mb-3 font-normal text-zinc-400">
                {author} - {formatDate(date)}
            </p>
            <Link
                to={'post/' + id}
                className="inline-flex items-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Leer más
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    );
}

export default Post;
