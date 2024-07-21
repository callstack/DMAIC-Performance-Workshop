import {db} from '../lib/db';
import type {Message} from '../lib/types';

export const getAllChatMessages = async () => {
  const response = await db.instance.executeAsync(
    'SELECT * FROM messages GROUP BY chat_id',
  );

  const messages = response.rows?._array as Message[];
  return messages;
};

export const getChatMessages = async (chatId: number) => {
  const response = await db.instance.executeAsync(
    'SELECT * FROM messages WHERE chat_id = ?',
    [chatId],
  );

  const messages = response.rows?._array as Message[];

  // We sort the messages by created_at in descending order to show the most recent ones
  const sortedMessages = messages.sort((a, b) =>
    b.created_at.toLowerCase().localeCompare(a.created_at.toLowerCase()),
  );

  return sortedMessages;
};
