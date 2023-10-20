import Post from '../models/posts.model.js';

export const getPosts = (req, res) => {
    const { q } = req.query;
    Post.find({ $or: [{ author: { $regex: q || '', $options: 'i' } }, { title: { $regex: q || '', $options: 'i' } }, { content: { $regex: q || '', $options: 'i' } }] })
        .then((data) => {
            res.json(
                data.map((post) => {
                    if (post.content.length > 70) post.content = post.content.substring(0, 70);
                    return post;
                })
            );
        })
        .catch((error) => res.json({ message: error }));
};

export const createPost = async (req, res) => {
    const { title, author, date, content } = req.body;
    const newPost = new Post({
        title,
        author,
        date,
        content,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
};

export const getPost = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
        })
        .catch((error) => res.json({ message: error }));
};

export const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
        })
        .catch((error) => res.json({ message: error }));
};

export const updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((post) => {
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
        })
        .catch((error) => res.json({ message: error }));
};
