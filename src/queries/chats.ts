import {db} from '../lib/db';
import type {Chat as ChatT} from '../lib/types';
import Chat from '../models/Chat';
import User from '../models/User';
import {getChatMessages} from './messages';
import {getUser} from './users';

export const getRecentChats = async () => {
  const allChats = await getChats();
  const chats = allChats.map(async chat => {
    const messages = await getChatMessages(chat.id);
    const last_message = messages[0].content;
    const last_message_time = messages[0].created_at;

    const author = (await getUser(messages[0].author_id))!;
    const last_message_author = User.fromDB(author);

    return new Chat(
      chat.id,
      chat.title,
      chat.is_vip,
      last_message,
      last_message_author,
      last_message_time,
    );
  });

  return Promise.all(chats);
};

export const getChats = async () => {
  const response = await db.instance.executeAsync(
    `SELECT chats.id, chats.title, chats.is_vip
     FROM chats
     GROUP BY chats.id`,
  );
  return response.rows?._array as ChatT[];
};

export const getChat = async (id: number) => {
  const chats = await getChats();
  const chat = chats.find(chat => chat.id === id);
  return chat;
};
