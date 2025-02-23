import { User } from '../entities/user.entity';
import { IUserModel } from './interfaces/user.model.interface';

export class UserModel implements IUserModel {
  createUser(email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUser(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: number, email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
};