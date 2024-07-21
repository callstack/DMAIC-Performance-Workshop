import {db} from '../lib/db';
import {InboxMessage} from '../lib/types';

export const getInboxMessages = async () => {
  const response = await db.instance.executeAsync('SELECT * FROM inbox');

  return response.rows?._array as InboxMessage[];
};
