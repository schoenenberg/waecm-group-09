import { Schema } from 'mongoose';

export const SubredditSchema = new Schema({
  name: String,
  keywords: [String],
  answer: String,
  active: Boolean,
  description: String,
  icon: String,
  answeredCommentIDs: [String],
  createdOn: Date,
});
