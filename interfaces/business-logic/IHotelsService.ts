import { HotelEntity } from "@entities/HotelEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface IHotelsService extends IBaseService<HotelEntity> {
}

export const IHotelsService = Symbol("IHotelsService");