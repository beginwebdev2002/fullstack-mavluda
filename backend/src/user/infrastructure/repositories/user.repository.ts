import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@user/domain/user.entity';
import {
  UserDocument,
  UserSchemaEntity,
} from '@user/infrastructure/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserSchemaEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    const docs = await this.userModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findByTelegramId(telegramId: number): Promise<User | null> {
    const doc = await this.userModel.findOne({ telegramId }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const createdUser = new this.userModel(user);
    const doc = await createdUser.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<User | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const doc = await this.userModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  private toDomain(doc: UserDocument): User {
    const d = doc as any;
    return new User(
      d._id.toString(),
      d.firstName,
      d.telegramId,
      d.email,
      d.passwordHash,
      d.lastName,
      d.username,
      d.photoUrl,
      d.role as 'user' | 'admin',
      // doc.createdAt is available because of timestamps: true
      d.createdAt,
    );
  }
}
