import { getAllPostsService, getPostByIdService, createPostService, updatePostService, deletePostService, likePostService } from '../services/post.js';
import { makeResponse } from '@/utils';

export const getAllPosts = async (req, res) => {
  const posts = await getAllPostsService();
  return makeResponse({ res, data: posts });
};

export const getPostById = async (req, res) => {
  const post = await getPostByIdService(req.params.id);
  return makeResponse({ res, data: post });
};

export const createPost = async (req, res) => {
  const post = await createPostService(req.body);
  return makeResponse({ res, data: post, message: 'Post created successfully' });
};

export const updatePost = async (req, res) => {
  const post = await updatePostService(req.params.id, req.body);
  return makeResponse({ res, data: post, message: 'Post updated successfully' });
};

export const deletePost = async (req, res) => {
  await deletePostService(req.params.id);
  return makeResponse({ res, message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const post = await likePostService(req.params.id, req.user._id);
  return makeResponse({ res, data: post });
};
