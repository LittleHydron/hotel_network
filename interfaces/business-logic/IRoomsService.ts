import { RoomEntity } from "@entities/RoomEntity";
import { DeleteResult } from "typeorm";

export interface IRoomsService {
    create(room: Partial<RoomEntity>): Promise<void>;
    findAll(): Promise<RoomEntity[]>;
    findOne(id: number): Promise<RoomEntity>;
    update(id: number, changedRoom: Partial<RoomEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const IRoomsService = Symbol("IRoomsService");