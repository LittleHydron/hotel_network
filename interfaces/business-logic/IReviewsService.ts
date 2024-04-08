import { ReviewEntity } from "@entities/ReviewEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface IReviewsService extends IBaseService<ReviewEntity> {
}

export const IReviewsService = Symbol("IReviewsService");