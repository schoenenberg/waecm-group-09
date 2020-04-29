import { Document } from 'mongoose';

export interface SubredditMongo extends Document {
  readonly name: string;
  readonly keywords: string[];
  readonly answer: string;
  readonly active: boolean;
  readonly createdOn: Date;
  description: string;
  icon: string;
  answeredCommentIDs: string[];
}
