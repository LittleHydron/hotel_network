import { ReviewEntity } from "@entities/ReviewEntity";
import { DeleteResult } from "typeorm";

export interface IReviewsService {
    create(review: Partial<ReviewEntity>): Promise<void>;
    findAll(): Promise<ReviewEntity[]>;
    findOne(id: number): Promise<ReviewEntity>;
    update(id: number, changedReview: Partial<ReviewEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const IReviewsService = Symbol("IReviewsService");