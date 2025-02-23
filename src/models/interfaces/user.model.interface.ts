import { User } from '../../entities/user.entity';

export interface IUserModel {
  createUser(email: string, password: string): Promise<User>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(id: number, email: string, password: string): Promise<User>;
  deleteUser(id: number): Promise<User>;
}