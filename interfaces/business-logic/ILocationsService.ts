import { LocationEntity } from "@entities/LocationEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface ILocationsService extends IBaseService<LocationEntity> {
}

export const ILocationsService = Symbol("ILocationsService");