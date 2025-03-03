import { IAchievement } from './interfaces/achievement.interface';

export class Achievement implements IAchievement {
    id?: number | undefined;
    name: string;
    reward: string;
    user_id: number;

  constructor(name: string, reward: string, user_id: number) {
    this.name = name
    this.reward = reward
    this.user_id = user_id
  }
}