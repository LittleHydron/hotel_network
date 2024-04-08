import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ReviewEntity } from '@entities/ReviewEntity';
import { IReviewsService } from '@interfaces/business-logic/IReviewsService';
import { IReviewsController } from '@interfaces/presentation/IReviewsController';

@Controller('reviews')
export class ReviewsController implements IReviewsController{
  constructor(@Inject(IReviewsService) private readonly reviewsService: IReviewsService) {}

  @Post()
  async create(@Body() review: Partial<ReviewEntity>) {
    return this.reviewsService.create(review);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.reviewsService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() review: Partial<ReviewEntity>) {
    return this.reviewsService.update(Number(id), review);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(Number(id));
  }
}
