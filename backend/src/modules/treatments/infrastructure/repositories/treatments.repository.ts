import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Treatments } from '../../domain/treatments.entity';
import {
  TreatmentsDocument,
  TreatmentsSchemaEntity,
} from '../schemas/treatments.schema';

@Injectable()
export class TreatmentsRepository {
  constructor(
    @InjectModel(TreatmentsSchemaEntity.name)
    private readonly treatmentsModel: Model<TreatmentsDocument>,
  ) {}

  async count(): Promise<number> {
    return this.treatmentsModel.countDocuments().exec();
  }

  async findAll(): Promise<Treatments[]> {
    const docs = await this.treatmentsModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(
    treatment: Omit<Treatments, 'id' | 'createdAt'>,
  ): Promise<Treatments> {
    const created = new this.treatmentsModel(treatment);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Treatments | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.treatmentsModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Treatments>,
  ): Promise<Treatments | null> {
    const doc = await this.treatmentsModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<Treatments | null> {
    const result = await this.treatmentsModel.findByIdAndDelete(id).exec();
    return result ? this.toDomain(result) : null;
  }

  private toDomain(doc: TreatmentsDocument): Treatments {
    return new Treatments(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.price,
      doc.duration,
      doc.category as 'medical' | 'beauty',
      doc.imageUrl,
      doc.active,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
