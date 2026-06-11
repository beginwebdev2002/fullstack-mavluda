import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserDocument, UserSchemaEntity } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserSchemaEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async count(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  async findAll(): Promise<User[]> {
    const docs = await this.userModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
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
    if (typeof email !== 'string' || email.trim().length === 0) {
      return null;
    }
    const doc = await this.userModel.findOne({ email: { $eq: email } }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  private toDomain(doc: UserDocument): User {
    // Safety check for optional fields if needed, but schema defines them.
    // Mongoose documents have _id, and timestamps adds createdAt
    return new User(
      doc._id.toString(),
      doc.firstName,
      doc.email,
      doc.passwordHash,
      doc.lastName,
      doc.username,
      doc.photoUrl,
      doc.phone,
      doc.role as 'user' | 'admin',
      // doc.createdAt is available because of timestamps: true
      (doc as unknown as { createdAt: Date }).createdAt,
    );
  }
}
