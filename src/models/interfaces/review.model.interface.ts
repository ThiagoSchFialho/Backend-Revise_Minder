import { Review } from '../../entities/review.entity';

export interface IReviewModel {
  createReview(topic: string, status: string, date: string, study_id: number): Promise<Review>;
  getReviewsFromStudy(study_id: number): Promise<Review[]>;
  getReviews(): Promise<Review[]>;
  deleteReview(id: number): Promise<Review>;
  updateReview(id: number, topic: string, date: string): Promise<Review>;
}