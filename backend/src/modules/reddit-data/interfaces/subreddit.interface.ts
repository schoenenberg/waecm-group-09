import { Document } from 'mongoose';

export interface SubredditMongo extends Document {
  readonly name: string;
  readonly keywords: string[];
  readonly answer: string;
  readonly active: boolean;
  readonly createdOn: Date;
  readonly username: string;
  description: string;
  icon: string;
  answeredCommentIDs: string[];
}
