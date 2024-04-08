import { LocationEntity } from "@entities/LocationEntity";
import { DeleteResult } from "typeorm";

export interface ILocationsService {
    create(location: Partial<LocationEntity>): Promise<void>;
    findAll(): Promise<LocationEntity[]>;
    findOne(id: number): Promise<LocationEntity>;
    update(id: number, changedLocation: Partial<LocationEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const ILocationsService = Symbol("ILocationsService");