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

  async create(review: Partial<ReviewEntity>): Promise<ReviewEntity> {
    const newReview = new ReviewEntity(review);
    const newId = (await this.reviewsRepository.find()).reduce((max, review) => review.id > max ? review.id : max, 0) + 1;
    newReview.id = newId;
    return await this.reviewsRepository.save(newReview);
  }

  async findAll() {
    return this.reviewsRepository.find();
  }

  async findOne(id: number) {
    return this.reviewsRepository.findOneBy({id});
  }

  async update(id: number, changedReview: Partial<ReviewEntity>): Promise<ReviewEntity> {
    let review = await this.reviewsRepository.findOneBy({id});
    review.id = id;
    Object.assign(review, changedReview);
    await this.reviewsRepository.update(id, review);
    return review;
  }

  async remove(id: number): Promise<ReviewEntity> {
    let removedReview = await this.reviewsRepository.findOneBy({id});
    await this.reviewsRepository.remove(removedReview);
    return removedReview;
  }

  async exportFromCSVToDB() {
    let reviews: ReviewEntity[] = await ReviewEntity.parseObjectsFromCSV();
    for (let review of reviews) {
      console.log("Saving review: ", review);
      await this.reviewsRepository.save(review);
    }
    return {message: "Reviews imported from CSV"};
  }

  static getFields() {
    return ReviewEntity.getFields();
  }

  async dropTable(): Promise<any> {
    await this.reviewsRepository.clear();
    return {message: "Reviews table dropped"};
  }
}
