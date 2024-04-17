export interface IBaseService<T> {

    create(obj: Partial<T>): Promise<T>;

    findAll(): Promise<T[]>;

    findOne(id: number): Promise<T>;

    update(id: number, changedObj: Partial<T>): Promise<T>;

    remove(id: number): Promise<T>;
    
    exportFromCSVToDB(): Promise<any>;

    dropTable(): Promise<any>;
}