import {open, DB} from '@op-engineering/op-sqlite';

export const enum DBSize {
  xsmall,
  small,
  medium,
  large,
}

class Database {
  _db: DB | null = null;

  init(name: string) {
    this._db = open({name});
  }

  get instance() {
    if (!this._db) {
      throw new Error('Database not initialized');
    }

    return this._db;
  }
}

export const db = new Database();
