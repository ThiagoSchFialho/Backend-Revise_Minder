import { Review } from '../../entities/review.entity';

export interface IReviewModel {
  createReview(topic: string, status: string, date: string, study_id: number, user_id: number): Promise<Review>;
  getReviewsFromStudy(study_id: number): Promise<Review[]>;
  getReviews(user_id: number): Promise<Review[]>;
  deleteReview(id: number): Promise<Review>;
  updateReview(id: number, topic: string, date: string): Promise<Review>;
  updateReviewStatus(id: number, status: string): Promise<Review>;
}