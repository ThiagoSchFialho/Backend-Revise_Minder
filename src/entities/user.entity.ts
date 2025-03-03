import { IUser } from './interfaces/user.interface';

export class User implements IUser {
  id?: number | undefined;
  email: string;
  password: string;
  qnt_studies: number;
  qnt_reviews_done: number;
  
  constructor (email: string, password: string, qnt_studies: number, qnt_reviews_done: number) {
    this.email = email
    this.password = password
    this.qnt_studies = qnt_studies
    this.qnt_reviews_done = qnt_reviews_done
  }
}