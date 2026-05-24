import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Veil } from '../../domain/veil.entity';
import { VeilDocument, VeilSchemaEntity } from '../schemas/veil.schema';
import { fileDelete } from '@common/utils/file-system';

@Injectable()
export class VeilRepository {
  constructor(
    @InjectModel(VeilSchemaEntity.name)
    private readonly veilModel: Model<VeilDocument>,
  ) {}

  async count(): Promise<number> {
    const count = await this.veilModel.countDocuments().exec();
    return count;
  }

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
    const veil = await this.findById(id);
    if (!veil) {
      return null;
    }
    if (veil.image) {
      fileDelete(veil.image);
    }

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
    const {
      _id,
      name,
      description,
      price,
      rentalPrice,
      image,
      category,
      isAvailable,
      sku,
      silhouette,
      neckline,
      fabric,
      trainLength,
      stock,
      createdAt,
      updatedAt,
    } = doc;

    return new Veil({
      id: _id.toString(),
      name,
      description,
      price,
      rentalPrice,
      image,
      category,
      isAvailable,
      sku,
      silhouette,
      neckline,
      fabric,
      trainLength,
      stock,
      createdAt,
      updatedAt,
    });
  }
}
