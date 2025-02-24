import { Study } from '../entities/study.entity';
import { IStudyModel } from './interfaces/study.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class StudyModel implements IStudyModel {
  public async createStudy(topic: string, qnt_reviews: number, date: string, use_id: number): Promise<Study> {
    const client = await pool.connect();
    let result: QueryResult<Study>;
    
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
    let result: QueryResult<Study>;

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

  public async getStudies(user_id: number): Promise<Study[]> {
    const client = await pool.connect();
    let result: QueryResult<Study>;

    try {
      result = await client.query(`
        SELECT *
        FROM studies
        WHERE user_id = $1;`,
        [user_id]
      );

    } catch (error) {
      console.error('Erro ao recuperar estudos', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows;
  }

  public async updateStudy(id: number, topic: string, qnt_reviews: number, date: string, use_id: number): Promise<Study> {
    const client = await pool.connect();
    let result: QueryResult<Study>;
    
    try {
      result = await client.query(`
        UPDATE studies
        SET topic = $1, qnt_reviews = $2, date = $3, user_id = $4
        WHERE id = $5
        RETURNING *;`,
        [topic, qnt_reviews, date, use_id, id]
      );
      
    } catch (error) {
      console.error('Erro ao editar estudo', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async deleteStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
}