import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { SubredditModel } from './subreddit.model';
import { Subreddit } from './interfaces/subreddit.interface';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel('Subreddit') private subredditModel: Model<Subreddit>,
    private redditClient: RedditConnector,
  ) {}

  async findAll(): Promise<Subreddit[]> {
    return await this.subredditModel.find().exec();
  }

  async createSubreddit(
    newSubredditDTO: NewSubredditInput,
  ): Promise<SubredditModel> {
    // TODO: get current answer count from database

    return this.redditClient
      .subredditDetails(newSubredditDTO.name)
      .then(subreddit => {
        const additionalData = {
          description: subreddit.title,
          icon: subreddit.icon_img,
          answerCount: 6, // TODO: No functionality found for that in reddit api, only active user count
        };

        const combinedSubredditData = {
          ...newSubredditDTO,
          ...additionalData,
        };
        const createdSubreddit = new this.subredditModel(combinedSubredditData);

        return createdSubreddit.save();
      });
  }

  async readOne(id: string): Promise<Subreddit> {
    const foundSubreddit = await this.subredditModel.findOne({ _id: id });

    if (!foundSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return foundSubreddit;
  }

  async update(
    id: string,
    subreddit: UpdateSubredditInput,
  ): Promise<Subreddit> {
    // TODO: when name is changed, also fetch new icon and description from reddit
    const updatedSubreddit = await this.subredditModel.findByIdAndUpdate(
      id,
      subreddit,
      {
        new: true,
      },
    );

    if (!updatedSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return updatedSubreddit;
  }

  async delete(id: string): Promise<Subreddit> {
    const subredditToDelete = await this.subredditModel.findByIdAndRemove(id);

    if (!subredditToDelete)
      throw new Error('ERROR: Could not be updated - ID not found');

    return subredditToDelete;
  }

  async getAllActive(): Promise<Subreddit[]> {
    return await this.subredditModel
      .find({ active: true })
      .limit(5)
      .exec();
  }
}
