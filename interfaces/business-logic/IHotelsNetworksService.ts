import { HotelsNetworkEntity } from "@entities/HotelsNetworkEntity";
import { DeleteResult } from "typeorm";

export interface IHotelsNetworksService {
    create(hotelsNetwork: Partial<HotelsNetworkEntity>): Promise<void>;
    findAll(): Promise<HotelsNetworkEntity[]>;
    findOne(id: number): Promise<HotelsNetworkEntity>;
    update(id: number, changedHotelsNetwork: Partial<HotelsNetworkEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const IHotelsNetworksService = Symbol("IHotelsNetworksService");