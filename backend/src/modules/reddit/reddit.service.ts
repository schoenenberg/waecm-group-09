import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { SubredditModel } from './subreddit.model';
import { Subreddit } from './interfaces/subreddit.interface';
import Snoowrap = require('snoowrap');

@Injectable()
export class RedditService {
  private redditClient: Snoowrap;

  constructor(
    @InjectModel('Subreddit') private subredditModel: Model<Subreddit>,
  ) {
    this.redditClient = new Snoowrap({
      userAgent: 'bot from /u/' + process.env.REDDIT_USERNAME,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    });
  }

  async findAll(): Promise<Subreddit[]> {
    return await this.subredditModel.find().exec();
  }

  async createSubreddit(
    newSubredditDTO: NewSubredditInput,
  ): Promise<SubredditModel> {
    // TODO: get data from reddit (description, icon)
    // TODO: get current answer count from database

    const subreddit = this.redditClient.getSubreddit(newSubredditDTO.name);

    const additionalData = {
      description: subreddit.description,
      icon: subreddit.icon_img,
      answerCount: 6, // TODO: No functionality found for that in reddit api, only active user count
    };

    const combinedSubredditData = {
      ...newSubredditDTO,
      ...additionalData,
    };
    const createdSubreddit = new this.subredditModel(combinedSubredditData);

    return await createdSubreddit.save();
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
}
