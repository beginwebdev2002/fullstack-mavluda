import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserDocument, UserSchemaEntity } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserSchemaEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async findByTelegramId(telegramId: number): Promise<User | null> {
    const doc = await this.userModel.findOne({ telegramId }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const createdUser = new this.userModel(user);
    const doc = await createdUser.save();
    return this.toDomain(doc);
  }

  private toDomain(doc: UserDocument): User {
    return new User(
      doc._id.toString(),
      doc.telegramId,
      doc.firstName,
      doc.lastName,
      doc.username,
      doc.photoUrl,
      doc.role as 'user' | 'admin',
      // doc.createdAt is available because of timestamps: true
      (doc as any).createdAt,
    );
  }
}
