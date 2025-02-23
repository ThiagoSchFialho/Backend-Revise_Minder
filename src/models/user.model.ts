import { User } from '../entities/user.entity';
import { IUserModel } from './interfaces/user.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class UserModel implements IUserModel {
  public async createUser(email: string, password: string): Promise<User> {
    const client = await pool.connect();
    let result: QueryResult<User>;

    try {
      result = await client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *`,
        [email, password]   
      );

    } catch(error) {
      console.error('Erro ao criar usuário', error);
      throw error

    } finally {
      client.release();
    }

    return result.rows[0];
  }
  public async getUser(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  public async getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  public async getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  public async updateUser(id: number, email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  public async deleteUser(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
}