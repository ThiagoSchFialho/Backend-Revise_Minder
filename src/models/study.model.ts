import { Study } from '../entities/study.entity';
import { IStudyModel } from './interfaces/study.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class StudyModel implements IStudyModel {
  public async createStudy(topic: string, qnt_reviews: number, date: string, use_id: number): Promise<Study> {
    const client = await pool.connect();
    let result: QueryResult;
    
    try {
      result = await client.query(`
        INSERT INTO studies (topic, qnt_reviews, date, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        [topic, qnt_reviews, date, use_id]
      );
      
    } catch (error) {
      console.error('Erro ao criar estudo', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getStudy(id: number): Promise<Study> {
    const client = await pool.connect();
    let result: QueryResult;

    try {
      result = await client.query(`
        SELECT *
        FROM studies
        WHERE id = $1;`,
        [id]
      );

    } catch (error) {
      console.error('Erro ao recuperar estudo', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getStudies(): Promise<Study[]> {
    const client = pool.connect();
    let result: QueryResult;

    try {
      result = client.query(`
        SELECT *
        FROM studies;`);

    } catch (error) {
      console.error('Erro ao recuperar estudos', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows;
  }

  public async updateStudy(id: number, topic: string, qnt_reviews: number, date: string): Promise<Study> {
    throw new Error('Method not implemented.');
  }

  public async deleteStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
}