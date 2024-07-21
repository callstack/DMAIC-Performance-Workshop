import {parsePhoneNumber} from 'libphonenumber-js';
import {User as UserT} from '../lib/types';

class User {
  id: number;
  name: string;
  email: string;
  phone: string;

  constructor(id: number, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;

    if (!this.validatePhoneNumber(phone)) {
      this.phone = 'invalid-phone-number';
    } else {
      this.phone = phone;
    }
  }

  static fromDB(user: UserT) {
    return new User(user.id, user.name, user.email, user.phone);
  }

  validatePhoneNumber(phone: string) {
    try {
      const phoneNumber = parsePhoneNumber(phone, 'US');
      return phoneNumber.isValid();
    } catch (error) {
      return false;
    }
  }
}

export default User;
