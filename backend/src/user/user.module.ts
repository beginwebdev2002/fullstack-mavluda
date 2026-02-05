import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './application/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import {
  UserSchema,
  UserSchemaEntity,
} from './infrastructure/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaEntity.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
