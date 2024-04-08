import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReviewEntity } from '@entities/ReviewEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IReviewsService } from '@interfaces/business-logic/IReviewsService';

@Injectable()
export class ReviewsService implements IReviewsService{

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
  ){}

  async create(review: Partial<ReviewEntity>) {
    const newReview = new ReviewEntity(review);
    const newId = (await this.reviewsRepository.find()).reduce((max, review) => review.id > max ? review.id : max, 0) + 1;
    newReview.id = newId;
    await this.reviewsRepository.save(newReview);
  }

  async findAll() {
    return this.reviewsRepository.find();
  }

  async findOne(id: number) {
    return this.reviewsRepository.findOneBy({id});
  }

  async update(id: number, changedReview: Partial<ReviewEntity>) {
    let review = await this.reviewsRepository.findOneBy({id});
    review.id = id;
    await this.reviewsRepository.save(review);
  }

  async remove(id: number) {
    return this.reviewsRepository.delete({id});
  }

  async exportFromCSVToDB() {
    let reviews: ReviewEntity[] = await ReviewEntity.parseObjectsFromCSV();
    for (let review of reviews) {
      console.log("Saving review: ", review);
      await this.reviewsRepository.save(review);
    }
  }
}
