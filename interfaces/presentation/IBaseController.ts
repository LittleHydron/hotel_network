export interface IBaseController<T> {

  create(obj: Partial<T>): Promise<T>;

  exportFromCSVToDB(): Promise<void>;

  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T>;

  update(id: string, obj: Partial<T>): Promise<T>;

  remove(id: string): Promise<T>;

  dropTable(): Promise<any>;
}
