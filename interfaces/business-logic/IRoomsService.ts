import { RoomEntity } from "@entities/RoomEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface IRoomsService extends IBaseService<RoomEntity> {
}

export const IRoomsService = Symbol("IRoomsService");