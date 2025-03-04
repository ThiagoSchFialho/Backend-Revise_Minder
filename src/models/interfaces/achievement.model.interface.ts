import { Achievement } from '../../entities/achievement';

export interface IAchievementModel {
  createAchievement(name: string, reward: string, user_id: number): Promise<Achievement>;
  getAchievementByName(name: string, user_id: number): Promise<Achievement>;
}