import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import NewPostPage from './pages/NewPostPage';
import { PostProvider } from './context/PostsContext';

function App() {
    return (
        <PostProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/post/:id" element={<PostPage />}></Route>
                    <Route path="/new-post" element={<NewPostPage />}></Route>
                </Routes>
            </BrowserRouter>
        </PostProvider>
    );
}

export default App;
