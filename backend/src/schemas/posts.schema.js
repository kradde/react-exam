import { z } from 'zod';

export const createPostSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
        })
        .trim(),
    author: z
        .string({
            required_error: 'Author is required',
        })
        .trim(),
    date: z
        .date({
            required_error: 'Date is required',
        })
        .optional(),
    content: z
        .string({
            required_error: 'Content is required',
        })
        .min(10, { message: 'Content must be at least 10 characters' }),
});

export const updatePostSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
        })
        .trim()
        .optional(),
    author: z
        .string({
            required_error: 'Author is required',
        })
        .trim()
        .optional(),
    date: z
        .date({
            required_error: 'Date is required',
        })
        .optional(),
    content: z
        .string({
            required_error: 'Content is required',
        })
        .min(10, { message: 'Content must be at least 10 characters' })
        .optional(),
});
