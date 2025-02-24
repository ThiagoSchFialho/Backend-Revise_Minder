import { Review } from '../entities/review.entity';
import { IReviewModel } from './interfaces/review.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class ReviewModel implements IReviewModel {
  public async createReview(topic: string, status: string, date: string, study_id: number): Promise<Review> {
    const client = await pool.connect();
    let result: QueryResult<Review>;
    
    try {
      result = await client.query(`
        INSERT INTO reviews (topic, status, date, study_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        [topic, status, date, study_id]
      );
      
    } catch (error) {
      console.error('Erro ao criar revisão', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getReviewsFromStudy(study_id: number): Promise<Review[]> {
    const client = await pool.connect();
    let result: QueryResult<Review>;
    
    try {
      result = await client.query(`
        SELECT *
        FROM reviews
        WHERE study_id = $1;`,
        [study_id]
      );
      
    } catch (error) {
      console.error('Erro ao recuperar revisões', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows;
  }

  public async getReviews(): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }

  public async deleteReview(id: number): Promise<Review> {
    const client = await pool.connect();
    let result: QueryResult<Review>;
    
    try {
      result = await client.query(`
        DELETE
        FROM reviews
        WHERE id = $1
        RETURNING *;`,
        [id]
      );
      
    } catch (error) {
      console.error('Erro ao remover revisão', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async updateReview(id: number, topic: string, date: string): Promise<Review> {
    const client = await pool.connect();
    let result: QueryResult<Review>;
    
    try {
      result = await client.query(`
        UPDATE reviews
        SET topic = $1, date = $2
        WHERE id = $3
        RETURNING *;`,
        [topic, date, id]
      );
      
    } catch (error) {
      console.error('Erro ao atualizar revisão', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }
}