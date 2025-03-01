import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(_id: string): Promise<User> {
    console.log('Fetching User with ID:', _id);
    const user = await this.userModel.findById(_id).select('-password');

    if (!user) {
      console.error('User Not Found:', _id);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(
    _id: string,
    updateData: UpdateProfileDto,
  ): Promise<User> {
    console.log('Updating User with ID:', _id);
    console.log('Update Data:', updateData);

    const user = await this.userModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .select('-password');

    if (!user) {
      console.error('User Not Found for Update:', _id);
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
