import { IUser } from './interfaces/user.interface';

export class User implements IUser {
  id?: number | undefined;
  email: string;
  password: string;
  
  constructor (email: string, password: string) {
    this.email = email
    this.password = password
  };
};