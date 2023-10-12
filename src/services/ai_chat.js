import OpenAI from 'openai';
import { removeHTML } from '@/helpers/removeHTML';
// eslint-disable-next-line import/order
import { getChallengeById } from './challenge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const sendChat = async (message, id, code) => {
  const challenge = await getChallengeById(id);

  const sanitizedChallenge = removeHTML(challenge.description);

  const messages = [
    // System message 1: Introduction
    {
      role: 'system',
      content: 'You are a helpful assistant that explains challenges.'
    },
    // System message 2: Explaining the challenge
    {
      role: 'system',
      content: `You are a helpful assistant that explains challenges.`
    },
    {
      role: 'system',
      content: `You are assisting a user in understanding the following challenge: ${sanitizedChallenge}.`
    },
    // System message 3: Explaining the code
    {
      role: 'system',
      content: `In addition, you are helping the user identify mistakes in their code.`
    },
    {
      role: 'system',
      content: `You will assist the user in understanding the challenge: ${sanitizedChallenge}.`
    },
    {
      role: 'system',
      content: `You will guide the user in identifying errors in their code. users code: (${code}).`
    },
    // System message 4: Teaching approach
    {
      role: 'system',
      content: `Your role is to provide guidance without giving away the exact solution.`
    },
    {
      role: 'system',
      content: `You will assess the user's understanding of the question by reviewing their code and offering specific programming concepts as hints.`
    },
    // User's message
    {
      role: 'user',
      content: message
    },
    {
      role: 'user',
      content: `code: (${code}).`
    },
    {
      role: 'system',
      content: `only tell about the code if user ask about his code.`
    }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages
  });

  const responseMessage = response.choices[0].message;

  return responseMessage;
};
