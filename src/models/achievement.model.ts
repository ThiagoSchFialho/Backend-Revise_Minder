import { Achievement } from '../entities/achievement';
import { IAchievementModel } from './interfaces/achievement.model.interface'; 
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class AchievementModel implements IAchievementModel {
  public async createAchievement(name: string, reward: string, user_id: number): Promise<Achievement> {
    const client = await pool.connect();
    let result: QueryResult<Achievement>;

    try {
      const existingAchievement = await client.query(`
        SELECT * FROM achievements
        WHERE user_id = $1 AND name = $2;
      `, [user_id, name]);

      if (existingAchievement.rows.length > 0) {
        return existingAchievement.rows[0];
      }
    
      result = await client.query(`
        INSERT INTO achievements (name, reward, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [name, reward, user_id]
      );
      
    } catch (error) {
      console.error('Erro ao criar conquista', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

}