import User from './User';

class Chat {
  id: number;
  title: string;
  is_vip: boolean;
  last_message: string;
  last_message_author: User;
  last_message_time: string;

  constructor(
    id: number,
    title: string,
    is_vip: boolean,
    last_message: string,
    last_message_author: User,
    last_message_time: string,
  ) {
    this.id = id;
    this.title = title;
    this.is_vip = is_vip;
    this.last_message = last_message;
    this.last_message_author = last_message_author;
    this.last_message_time = last_message_time;
  }
}

export default Chat;
