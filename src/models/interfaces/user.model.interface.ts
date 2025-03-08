import { User } from '../../entities/user.entity';

export interface IUserModel {
  createUser(email: string, password: string, consented_terms: boolean, verification_token: string): Promise<User>;
  getUser(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserByVerificationToken(token: string): Promise<User>;
  getEmailByUser(id: number): Promise<User>;
  verifyUserEmail(id: number): Promise<User>;
  updateUserEmail(id: number, email: string): Promise<User>;
  updateUserPassword(id: number, password: string): Promise<User>;
  deleteUser(id: number): Promise<User>;
  addStudyAdded(id: number): Promise<User>;
  addReviewDone(id: number): Promise<User>;
  saveResetToken(id: number, resetToken: string, espires: Date): Promise<User>;
  getUserByResetToken(token: string): Promise<User>;
  clearResetToken(id: number): Promise<User>;
  updateVerificationToken(id: number, verificationToken: string): Promise<User>;
}