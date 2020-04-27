import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { SubredditModel } from './subreddit.model';
import { SubredditMongo } from './interfaces/subreddit.interface';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';
import { AnsweredCommentIDsInput } from './dto/add-anwered-comment-IDs.input';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel('Subreddit') private subredditModel: Model<SubredditMongo>,
    private redditClient: RedditConnector,
  ) {}

  async findAll(): Promise<SubredditMongo[]> {
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
          answeredCommentIDs: [],
        };

        const combinedSubredditData = {
          ...newSubredditDTO,
          ...additionalData,
        };

        const createdSubreddit = new this.subredditModel(combinedSubredditData);

        return createdSubreddit.save();
      });
  }

  async readOne(id: string): Promise<SubredditMongo> {
    const foundSubreddit = await this.subredditModel.findOne({ _id: id });

    if (!foundSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return foundSubreddit;
  }

  async update(
    id: string,
    subreddit: UpdateSubredditInput,
  ): Promise<SubredditMongo> {
    let icon: string;
    let description: string;

    if (subreddit.name != null) {
      await this.redditClient.subredditDetails(subreddit.name!)
        .then((val) => {
          icon = val.icon_img;
          description = val.description;
        });
    }

    const combinedData = {
      ...subreddit,
      ...{
        icon: subreddit.name != null ? icon! : null,
        description: (subreddit.name != null) ? description! : null,
      },
    };

    const updatedSubreddit = await this.subredditModel.findByIdAndUpdate(
      id,
      combinedData,
      {
        new: true,
      },
    );

    if (!updatedSubreddit)
      throw new Error('ERROR: Could not be updated - ID not found');

    return updatedSubreddit;
  }

  async delete(id: string): Promise<SubredditMongo> {
    const subredditToDelete = await this.subredditModel.findByIdAndRemove(id);

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
