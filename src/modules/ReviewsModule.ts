import { Module } from '@nestjs/common';
import { ReviewsService } from '@business-logic/ReviewsService';
import { ReviewsController } from '@presentation/ReviewsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '@entities/ReviewEntity';
import { IReviewsService } from '@interfaces/business-logic/IReviewsService';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewsController],
  providers: [{
    provide: IReviewsService,
    useClass: ReviewsService,
  }],
})
export class ReviewsModule {}
