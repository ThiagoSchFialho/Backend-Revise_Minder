import { IReview } from './interfaces/review.interface';

export class Review implements IReview {
  id?: number | undefined;
  topic: string;
  status: string;
  date: string;
  study_id: number;

  constructor(topic: string, status: string, date: string, study_id: number) {
    this.topic = topic
    this.status = status
    this.date = date
    this.study_id = study_id
  }
}