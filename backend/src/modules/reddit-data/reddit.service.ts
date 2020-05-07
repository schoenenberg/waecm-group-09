import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { SubredditModel } from './subreddit.model';
import { SubredditMongo } from './interfaces/subreddit.interface';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';
import { AnsweredCommentIDsInput } from './dto/add-anwered-comment-IDs.input';
import { User } from '../../types/user';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel('Subreddit') private subredditModel: Model<SubredditMongo>,
    private redditClient: RedditConnector,
  ) {}

  async findAll(): Promise<SubredditMongo[]> {
    return await this.subredditModel.find().exec();
  }

  async findAllForUser(user: User): Promise<SubredditMongo[]> {
    return await this.subredditModel
      .find({ username: user.preferred_username })
      .exec();
  }

  async createSubreddit(
    newSubredditDTO: NewSubredditInput,
    user: User
  ): Promise<SubredditModel> {
    // TODO: get current answer count from database

    return this.redditClient
      .subredditDetails(newSubredditDTO.name)
      .then(subreddit => {
        const additionalData = {
          description: subreddit.title,
          icon: subreddit.icon_img,
          answeredCommentIDs: [],
          username: user.preferred_username
        };

        const combinedSubredditData = {
          ...newSubredditDTO,
          ...additionalData,
        };

        const createdSubreddit = new this.subredditModel(combinedSubredditData);

        return createdSubreddit.save();
      });
  }

  async readOne(id: string, user: User): Promise<SubredditMongo> {
    const foundSubreddit = await this.subredditModel.findOne({ _id: id , username: user.preferred_username});
    
    if (!foundSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return foundSubreddit;
  }

  async update(
    id: string,
    subreddit: UpdateSubredditInput,
    user: User
  ): Promise<SubredditMongo> {
    // also fetch and change icon and description if name has changed
    const data = subreddit.name
      ? await this.redditClient.subredditDetails(subreddit.name).then(val => {
          return {
            ...subreddit,
            ...{
              icon: val.icon_img,
              description: val.description,
            },
          };
        })
      : subreddit;

    const updatedSubreddit = await this.subredditModel.findOneAndUpdate(
      {_id: id, username: user.preferred_username},
      data,
      {
        new: true,
      },
    );

    if (updatedSubreddit) console.log('UPDATE: ' + updatedSubreddit.toString());

    if (!updatedSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return updatedSubreddit;
  }

  async delete(id: string, user: User): Promise<SubredditMongo> {
    const subredditToDelete = await this.subredditModel
      .findOneAndRemove({_id: id, username: user.preferred_username});

    if (!subredditToDelete)
      throw new Error('ERROR: Could not be updated - ID not found');

    return subredditToDelete;
  }

  async getAllActive(): Promise<SubredditMongo[]> {
    return await this.subredditModel.find({ active: true }).exec();
  }

  async addNewAnsweredCommentIDs(
    id: string,
    answeredComments: AnsweredCommentIDsInput,
  ): Promise<void> {
    const updatedSubreddit = await this.subredditModel.findByIdAndUpdate(
      id,
      answeredComments,
      {
        new: true,
      },
    );

    if (!updatedSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');
  }
}
