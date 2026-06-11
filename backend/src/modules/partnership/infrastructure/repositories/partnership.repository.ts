import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partnership } from '../../domain/partnership.entity';
import {
  PartnershipDocument,
  PartnershipSchemaEntity,
} from '../schemas/partnership.schema';

@Injectable()
export class PartnershipRepository {
  constructor(
    @InjectModel(PartnershipSchemaEntity.name)
    private readonly partnershipModel: Model<PartnershipDocument>,
  ) {}

  async findAll(): Promise<Partnership[]> {
    const docs = await this.partnershipModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(
    partnership: Omit<Partnership, 'id' | 'createdAt'>,
  ): Promise<Partnership> {
    const created = new this.partnershipModel(partnership);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Partnership | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.partnershipModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Partnership>,
  ): Promise<Partnership | null> {
    const safeUpdateData: Partial<
      Pick<Partnership, 'partnerName' | 'contactEmail' | 'type' | 'status'>
    > = {};

    if (typeof updateData.partnerName === 'string') {
      safeUpdateData.partnerName = updateData.partnerName;
    }
    if (typeof updateData.contactEmail === 'string') {
      safeUpdateData.contactEmail = updateData.contactEmail;
    }
    if (typeof updateData.type === 'string') {
      safeUpdateData.type = updateData.type;
    }
    if (
      updateData.status === 'active' ||
      updateData.status === 'inactive'
    ) {
      safeUpdateData.status = updateData.status;
    }

    const doc = await this.partnershipModel
      .findByIdAndUpdate(id, { $set: safeUpdateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.partnershipModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: PartnershipDocument): Partnership {
    const d = doc as unknown as {
      _id: { toString: () => string };
      partnerName: string;
      contactEmail: string;
      type: string;
      status: 'active' | 'inactive';
      createdAt: Date;
    };
    return new Partnership(
      d._id.toString(),
      d.partnerName,
      d.contactEmail,
      d.type,
      d.status,
      d.createdAt,
    );
  }
}
