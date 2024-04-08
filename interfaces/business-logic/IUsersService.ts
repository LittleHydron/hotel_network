import { UserEntity } from "@entities/UserEntity";
import { IBaseService } from "@interfaces/business-logic/IBaseService";

export interface IUsersService extends IBaseService<UserEntity> {
}

export const IUsersService = Symbol("IUsersService");