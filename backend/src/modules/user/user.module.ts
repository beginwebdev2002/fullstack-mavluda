import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './application/user.service';
import { UserController } from './presentation/user.controller';
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
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
