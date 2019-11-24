import { User } from './interfaces/user';


export class CurrentUser {
  public static get user(): User {
    // return JSON.parse(localStorage.get('user')); BEFORE
    return JSON.parse(localStorage.getItem('user'));
  }
}
