import { Study } from '../../entities/study.entity';

export interface IStudyModel {
  createStudy(topic: string, qnt_reviews: number, date: string, user_id: number): Promise<Study>;
  getStudy(id: number): Promise<Study>;
  getStudies(): Promise<Study[]>;
  updateStudy(id: number, topic: string, qnt_reviews: number, date: string): Promise<Study>;
  deleteStudy(id: number): Promise<Study>;
}