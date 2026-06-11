import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '../../domain/gallery.entity';
import {
  GalleryDocument,
  GallerySchemaEntity,
} from '../schemas/gallery.schema';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(GallerySchemaEntity.name)
    private readonly galleryModel: Model<GalleryDocument>,
  ) {}

  async count(): Promise<number> {
    return this.galleryModel.countDocuments().exec();
  }

  async findAll(): Promise<Gallery[]> {
    const docs = await this.galleryModel.find().exec();
    const doc = docs.map((doc) => this.toDomain(doc));
    return doc;
  }

  async create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery> {
    const created = new this.galleryModel(gallery);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Gallery | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.galleryModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Gallery>,
  ): Promise<Gallery | null> {
    const doc = await this.galleryModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.galleryModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: GalleryDocument): Gallery {
    const d = doc as unknown as {
      _id: { toString: () => string };
      title: string;
      imageUrl: string;
      category: string;
      status: string;
      alt: string;
    };

    return new Gallery(
      d._id.toString(),
      d.title,
      d.imageUrl,
      d.category,
      d.status,
      d.alt,
    );
  }
}
