import { IUser } from './interfaces/user.interface';

export class User implements IUser {
  id?: number | undefined;
  email: string;
  password: string;
  qnt_studies_added: number;
  qnt_reviews_done: number;
  consented_terms: boolean;
  
  constructor (email: string, password: string, qnt_studies_added: number, qnt_reviews_done: number, consented_terms: boolean) {
    this.email = email
    this.password = password
    this.qnt_studies_added = qnt_studies_added
    this.qnt_reviews_done = qnt_reviews_done
    this.consented_terms = consented_terms
  }
}