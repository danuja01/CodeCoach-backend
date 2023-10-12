import { getAllPosts, getPostById, createPost, updatePost, deletePost, likePost } from '../repository/post.js';

export const getAllPostsService = async () => {
  return await getAllPosts();
};

export const getPostByIdService = async (id) => {
  return await getPostById(id);
};

export const createPostService = async (postData) => {
  return await createPost(postData);
};

export const updatePostService = async (id, newData) => {
  return await updatePost(id, newData);
};

export const deletePostService = async (id) => {
  return await deletePost(id);
};

export const likePostService = async (id, userId) => {
  return await likePost(id, userId);
};
