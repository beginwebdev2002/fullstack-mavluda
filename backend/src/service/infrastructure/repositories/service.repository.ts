import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '@services/domain/service.entity';
import {
  ServiceDocument,
  ServiceSchemaEntity,
} from '@services/infrastructure/schemas/service.schema';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(ServiceSchemaEntity.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async findAll(): Promise<Service[]> {
    const docs = await this.serviceModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(service: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    const created = new this.serviceModel(service);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Service | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.serviceModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Service>,
  ): Promise<Service | null> {
    const doc = await this.serviceModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.serviceModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: ServiceDocument): Service {
    const d = doc as any;
    return new Service(
      d._id.toString(),
      d.name,
      d.description,
      d.price,
      d.durationMinutes,
      d.category as 'medical' | 'beauty',
      d.createdAt,
    );
  }
}
