import {db} from '../lib/db';
import type {User} from '../lib/types';

export const getUsers = async () => {
  const response = await db.instance.executeAsync(
    `SELECT users.id, users.name, users.email, users.phone
     FROM users
     GROUP BY users.id`,
  );
  return response.rows?._array as User[];
};

export const getUser = async (id: number) => {
  const users = await getUsers();
  const user = users.find(user => user.id === id);
  return user;
};
