import { Review } from '../entities/review.entity';
import { IReviewModel } from './interfaces/review.model.interface';

export class ReviewModel implements IReviewModel {
  createReview(topic: string, status: string, date: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  getReview(id: number): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  getReviews(): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }
  updateReview(id: number, topic: string, status: string, date: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  deleteReview(id: number): Promise<Review> {
    throw new Error('Method not implemented.');
  }
};