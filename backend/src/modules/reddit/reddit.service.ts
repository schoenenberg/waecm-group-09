import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { SubredditInfo } from './reddit.model';
import { Subreddit } from './interfaces/subreddit.interface';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel('Subreddit') private subredditModel: Model<Subreddit>,
  ) {}

  async findAll(): Promise<Subreddit[]> {
    return await this.subredditModel.find().exec();
  }

  async createSubreddit(
    newSubredditDTO: NewSubredditInput,
  ): Promise<SubredditInfo> {
    // TODO: get data from reddit (description, icon)
    // TODO: get current answer count from database

    const sampleAdditionalData = {
      description: 'sample test description',
      icon: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      answerCount: 6,
    };

    const combinedSubredditData = {
      ...newSubredditDTO,
      ...sampleAdditionalData,
    };
    const createdSubreddit = new this.subredditModel(combinedSubredditData);

    return await createdSubreddit.save();
  }

  async remove(id: string): Promise<Subreddit | null> {
    return this.subredditModel.findOne({ _id: id });
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
