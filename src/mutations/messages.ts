import {db} from '../lib/db';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = async ({chatId, content}: Props) => {
  if (content === '/vip') {
    db.instance.executeAsync('UPDATE chats SET is_vip = 1 WHERE id = ?', [
      chatId,
    ]);
  }

  return db.instance.executeAsync(
    'INSERT INTO messages (chat_id, content, author_id) VALUES (?, ?, ?)',
    [chatId, content, 1],
  );
};
