import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '@gallery/domain/gallery.entity';
import { GalleryDocument, GallerySchemaEntity } from '@gallery/infrastructure/schemas/gallery.schema';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(GallerySchemaEntity.name)
    private readonly galleryModel: Model<GalleryDocument>,
  ) {}

  async findAll(): Promise<Gallery[]> {
    const docs = await this.galleryModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery> {
    const created = new this.galleryModel(gallery);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  private toDomain(doc: GalleryDocument): Gallery {
    return new Gallery(
      doc._id.toString(),
      doc.title,
      doc.imageUrl,
      doc.category,
      doc.tags,
      (doc as any).createdAt,
    );
  }
}
