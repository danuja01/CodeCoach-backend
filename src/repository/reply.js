// repository/reply.js
import Reply from '../models/replies';

export const createReply = async ({ postId, comment, author }) => {
    const reply = new Reply({ post: postId, comment, author });
    await reply.save();
    return reply;
};

export const getRepliesByPostId = async (postId) => {
    const replies = await Reply.find({ post: postId }).populate('author', 'name username');
    return replies;
};

export const deleteReplyById = async (replyId) => {
    const reply = await Reply.findByIdAndRemove(replyId);
    return reply;
};

export const updateReplyById = async (replyId, comment) => {
    const updatedReply = await Reply.findByIdAndUpdate(replyId, { comment }, { new: true });
    return updatedReply;
};
