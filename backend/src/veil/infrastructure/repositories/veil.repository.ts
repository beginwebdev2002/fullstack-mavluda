import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Veil } from '@veil/domain/veil.entity';
import {
  VeilDocument,
  VeilSchemaEntity,
} from '@veil/infrastructure/schemas/veil.schema';

@Injectable()
export class VeilRepository {
  constructor(
    @InjectModel(VeilSchemaEntity.name)
    private readonly veilModel: Model<VeilDocument>,
  ) {}

  async findAll(): Promise<Veil[]> {
    const docs = await this.veilModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findAvailable(): Promise<Veil[]> {
    const docs = await this.veilModel.find({ isAvailable: true }).exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(veil: Omit<Veil, 'id' | 'createdAt'>): Promise<Veil> {
    const created = new this.veilModel(veil);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Veil | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.veilModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(id: string, updateData: Partial<Veil>): Promise<Veil | null> {
    const doc = await this.veilModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.veilModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: VeilDocument): Veil {
    const d = doc as any;
    return new Veil(
      d._id.toString(),
      d.name,
      d.description,
      d.price,
      d.rentalPrice,
      d.images,
      d.category,
      d.isAvailable,
      d.createdAt,
    );
  }
}
