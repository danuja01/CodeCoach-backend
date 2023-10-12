import createError from 'http-errors';
import { sendChat } from '@/services/ai_chat';
import { makeResponse } from '@/utils';

export const sendChatController = async (req, res) => {
  try {
    const { message, id, code } = req.body;
    if (!message) throw new createError(400, 'Message is required');
    const response = await sendChat(message, id, code);
    return makeResponse({ res, data: response, message: 'Chat sent successfully' });
  } catch (err) {
    throw new createError(500, `Error when processing chat: ${err}`);
  }
};
