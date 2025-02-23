import { Study } from '../entities/study.entity';
import { IStudyModel } from './interfaces/study.model.interface';
import { QueryResult } from 'pg';
const pool = require('../db/db.config');

export class StudyModel implements IStudyModel {
  public async createStudy(topic: string, qnt_reviews: number, date: string): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  public async getStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  public async getStudies(): Promise<Study[]> {
    throw new Error('Method not implemented.');
  }
  public async updateStudy(id: number, topic: string, qnt_reviews: number, date: string): Promise<Study> {
    throw new Error('Method not implemented.');
  }
  public async deleteStudy(id: number): Promise<Study> {
    throw new Error('Method not implemented.');
  }
}