import Post from '../models/posts';

export const getAllPosts = async () => {
  return await Post.find().populate('author', 'name -_id');
};

export const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'name username');
};

export const createPost = async (postData) => {
  return await new Post(postData).save();
};

export const updatePost = async (id, newData) => {
  return await Post.findByIdAndUpdate(id, newData, { new: true });
};

export const deletePost = async (id) => {
  return await Post.findOneAndDelete({ _id: id });
};

export const likePost = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) throw new Error('Post not found');

  if (post.author.equals(userId)) throw new Error("You can't upvote your own post");

  const index = post.upvotes.indexOf(userId);

  if (index === -1) {
    post.upvotes.push(userId);
  } else {
    post.upvotes.splice(index, 1);
  }

  return await post.save();
};
