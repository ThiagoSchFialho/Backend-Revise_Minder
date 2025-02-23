import { Study } from '../entities/study.entity';
import { IStudyModel } from './interfaces/study.model.interface';

export class StudyModel implements IStudyModel {
  createStudy(topic: string, qnt_reviews: number, date: string): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  getStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  getStudies(): Promise<Study[]> {
    throw new Error('Method not implemented.');
  }
  updateStudy(id: number, topic: string, qnt_reviews: number, date: string): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  deleteStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
};