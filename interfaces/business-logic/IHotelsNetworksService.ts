import { HotelsNetworkEntity } from "@entities/HotelsNetworkEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface IHotelsNetworksService extends IBaseService<HotelsNetworkEntity> {
}

export const IHotelsNetworksService = Symbol("IHotelsNetworksService");