import { User } from '../entities/user.entity';
import { IUserModel } from './interfaces/user.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class UserModel implements IUserModel {
  public async updateVerificationToken(id: number, verificationToken: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        UPDATE users
        SET verification_token = $2
        WHERE id = $1
        RETURNING *;`,
        [id, verificationToken]
      );
    } catch (error) {
      console.error('Erro ao atualizar token', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async getUserByVerificationToken(token: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        SELECT *
        FROM users
        WHERE verification_token = $1;`,
        [token]
      );
    } catch (error) {
      console.error('Erro ao recuperar usuário', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async verifyUserEmail(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET is_verified = TRUE, verification_token = NULL
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

  public async createUser(email: string, password: string, consented_terms: boolean, verification_token: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        INSERT INTO users (email, password, consented_terms, verification_token, is_verified)
        VALUES ($1, $2, $3, $4, FALSE)
        RETURNING *;`,
        [email, password, consented_terms, verification_token]
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

  public async saveResetToken(id: number, resetToken: string, expires: Date): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
          UPDATE users
          SET reset_password_token = $1, reset_password_expires = $2
          WHERE id = $3
          RETURNING *;`,
          [resetToken, new Date(expires), id]
      )

    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
      throw error;

    } finally {
      client.release();
    }

    return result.rows[0];
  }
  
  public async getUserByResetToken(token: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        SELECT *
        FROM users
        WHERE reset_password_token = $1;`,
        [token]
      )

    } catch (error) {
      console.error('Erro ao recuperar usuário', error);
      throw error;
      
    } finally {
      client.release();
    }

    return result.rows[0];
  }
  
  public async clearResetToken(id: number): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;
    
    try {
      result = await client.query(`
        UPDATE users
        SET reset_password_token = NULL, reset_password_expires =  NULL
        WHERE id = $1
        RETURNING *;`,
        [id]
      )

    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
      throw error;
      
    } finally {
      client.release();
    }

    return result.rows[0];
  }
}
