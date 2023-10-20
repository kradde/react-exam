import { usePosts } from '../context/PostsContext';

function OnlineSign() {
    const { isOnline } = usePosts();

    return (
        <div className="my-3 px-2">
            <p className={`font-bold text-right ${isOnline ? 'text-green-500' : 'text-red-600'}`}>
                <svg className="w-3.5 h-3.5 mr-1 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="3" />
                </svg>
                {isOnline ? 'Online' : 'Offline'}
            </p>
        </div>
    );
}

export default OnlineSign;
