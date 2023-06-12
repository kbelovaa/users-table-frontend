import { makeAutoObservable } from 'mobx';

export default class TableStore {
  constructor() {
    this._users = [];
    this._page = 1;
    this._limit = 10;
    this._totalCount = 0;
    makeAutoObservable(this);
  }

  setUsers(users) {
    this._users = users;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get users() {
    return this._users;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get totalCount() {
    return this._totalCount;
  }
}
