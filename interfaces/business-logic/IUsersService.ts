import { UserEntity } from "@entities/UserEntity";
import { DeleteResult } from "typeorm";

export interface IUsersService {
    create(user: Partial<UserEntity>): Promise<void>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    update(id: number, changedUser: Partial<UserEntity>): Promise<void>;
    remove(id: number): Promise<DeleteResult>;
    exportFromCSVToDB(): Promise<void>;
}

export const IUsersService = Symbol("IUsersService");