import { HotelEntity } from "@entities/HotelEntity";
import { DeleteResult } from "typeorm";

export interface IHotelsService {
    create(hotel: Partial<HotelEntity>): Promise<void>;
    findAll(): Promise<HotelEntity[]>;
    findOne(id: number): Promise<HotelEntity>;
    update(id: number, changedHotel: Partial<HotelEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const IHotelsService = Symbol("IHotelsService");