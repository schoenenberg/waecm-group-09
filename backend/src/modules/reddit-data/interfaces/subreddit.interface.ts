import { Document } from 'mongoose';

export interface Subreddit extends Document {
  readonly name: string;
  readonly keywords: string[];
  readonly answer: string;
  readonly active: boolean;
  description: string;
  icon: string;
  answerCount: number;
}
