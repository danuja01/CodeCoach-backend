// services/reply.js
import * as replyRepository from '@/repository/reply';

export const createReplyService = async (replyDetails) => {
    const reply = await replyRepository.createReply(replyDetails);
    return reply;
};

export const getRepliesByPostIdService = async (postId) => {
    const replies = await replyRepository.getRepliesByPostId(postId);
    return replies;
};

export const deleteReplyByIdService = async (replyId) => {
    const reply = await replyRepository.deleteReplyById(replyId);
    return reply;
};

export const updateReplyByIdService = async (replyId, comment) => {
    const updatedReply = await replyRepository.updateReplyById(replyId, comment);
    return updatedReply;
};
