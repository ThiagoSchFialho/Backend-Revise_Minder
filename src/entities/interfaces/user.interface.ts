export interface IUser {
  id?: number;
  email: string;
  password: string;
  qnt_studies_added: number;
  qnt_reviews_done: number;
  consented_terms: boolean;
}