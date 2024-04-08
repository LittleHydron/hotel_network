export interface IBaseController<T> {

  create(user: Partial<T>): Promise<void>;

  exportFromCSVToDB(): Promise<void>;

  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T>;

  update(id: string, user: Partial<T>): Promise<void>;

  remove(id: string): Promise<void>;
}
