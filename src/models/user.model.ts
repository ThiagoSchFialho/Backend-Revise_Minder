import { User } from '../entities/user.entity';
import { IUserModel } from './interfaces/user.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class UserModel implements IUserModel {
  public async addStudyAdded(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET qnt_studies_added = qnt_studies_added + 1
        WHERE id = $1
        RETURNING *;`,
        [id]
      );
      
    } catch (error) {
      console.error('Erro ao editar email', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async addReviewDone(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET qnt_reviews_done = qnt_reviews_done + 1
        WHERE id = $1
        RETURNING *;`,
        [id]
      );
      
    } catch (error) {
      console.error('Erro ao editar email', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async createUser(email: string, password: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *;`,
        [email, password]
      );
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getUser(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;`,
        [id]
      );
    } catch (error) {
      console.error('Erro ao recuperar usuário', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getUserByEmail(email: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        SELECT *
        FROM users
        WHERE email = $1;`,
        [email]
      );
    } catch (error) {
      console.error('Erro ao recuperar usuário', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getEmailByUser(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        SELECT email
        FROM users
        WHERE id = $1;`,
        [id]
      );
    } catch (error) {
      console.error('Erro ao recuperar email', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async updateUserEmail(id: number, email: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET email = $1
        WHERE id = $2
        RETURNING *;`,
        [email, id]
      );
      
    } catch (error) {
      console.error('Erro ao editar email', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async updateUserPassword(id: number, password: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET password = $1
        WHERE id = $2
        RETURNING *;`,
        [password, id]
      );
      
    } catch (error) {
      console.error('Erro ao editar senha', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async deleteUser(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        DELETE from users
        WHERE id = $1
        RETURNING *;`,
        [id]
      );
      
    } catch (error) {
      console.error('Erro ao editar senha', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }
}
