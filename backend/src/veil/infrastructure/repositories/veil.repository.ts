import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Veil } from '@veil/domain/veil.entity';
import { VeilDocument, VeilSchemaEntity } from '@veil/infrastructure/schemas/veil.schema';

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

  private toDomain(doc: VeilDocument): Veil {
    return new Veil(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.price,
      doc.rentalPrice,
      doc.images,
      doc.category,
      doc.isAvailable,
      (doc as any).createdAt,
    );
  }
}
