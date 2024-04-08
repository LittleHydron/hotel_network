import { Module } from '@nestjs/common';
import { UsersService } from '@business-logic/UsersService';
import { UsersController } from '@presentation/UsersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/UserEntity';
import { IUsersService } from '@interfaces/business-logic/IUsersService';
import { ReviewEntity } from '@entities/ReviewEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ReviewEntity])],
  controllers: [UsersController],
  providers: [{
    provide: IUsersService,
    useClass: UsersService,
  }],
})
export class UsersModule {}
