import { DeleteResult } from "typeorm";

export interface IBaseService<T> {

    create(obj: Partial<T>): Promise<T>;

    findAll(): Promise<T[]>;

    findOne(id: number): Promise<T>;

    update(id: number, changedObj: Partial<T>): Promise<void>;

    remove(id: number): Promise<DeleteResult>;
    
    exportFromCSVToDB(): Promise<void>;
}