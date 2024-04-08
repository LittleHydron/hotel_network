export interface IBaseController<T> {

  create(obj: Partial<T>): Promise<void>;

  exportFromCSVToDB(): Promise<void>;

  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T>;

  update(id: string, obj: Partial<T>): Promise<void>;

  remove(id: string): Promise<void>;
}
