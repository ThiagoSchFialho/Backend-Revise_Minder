import { User } from '../../entities/user.entity';

export interface IUserModel {
  createUser(email: string, password: string): Promise<User>;
  getUser(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getEmailByUser(id: number): Promise<User>;
  updateUserEmail(id: number, email: string): Promise<User>;
  deleteUser(id: number): Promise<User>;
}