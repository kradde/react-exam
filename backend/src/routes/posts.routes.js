import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/posts.controller.js';
import { validateId, validateSchema } from '../middlewares/validator.middleware.js';
import { createPostSchema, updatePostSchema } from '../schemas/posts.schema.js';

const router = express.Router();

// get all posts
router.get('/posts', getPosts);

// get a post
router.get('/posts/:id', validateId, getPost);

// create post
router.post('/posts', validateSchema(createPostSchema), createPost);

// update a post
router.put('/posts/:id', validateId, validateSchema(updatePostSchema), updatePost);

// delete a post
router.delete('/posts/:id', validateId, deletePost);

export default router;
