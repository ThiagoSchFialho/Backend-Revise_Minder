import { IStudy } from './interfaces/study.interface';

export class Study implements IStudy {
  id?: number | undefined;
  topic: string;
  qnt_reviews: number;
  date: string;
  user_id: number;
  
  constructor (topic: string, qnt_reviews: number, date: string, user_id: number) {
    this.topic = topic
    this.qnt_reviews = qnt_reviews
    this.date = date
    this.user_id = user_id
  }
}