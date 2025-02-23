import { Review } from '../entities/review.entity';
import { IReviewModel } from './interfaces/review.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class ReviewModel implements IReviewModel {
  public async createReview(topic: string, status: string, date: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  public async getReview(id: number): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  public async getReviews(): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }
  public async updateReview(id: number, topic: string, status: string, date: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  public async deleteReview(id: number): Promise<Review> {
    throw new Error('Method not implemented.');
  }
}