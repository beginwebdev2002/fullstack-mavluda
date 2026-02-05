import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../domain/service.entity';
import { ServiceDocument, ServiceSchemaEntity } from '../schemas/service.schema';

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

  private toDomain(doc: ServiceDocument): Service {
    return new Service(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.price,
      doc.durationMinutes,
      doc.category as 'medical' | 'beauty',
      (doc as any).createdAt,
    );
  }
}
