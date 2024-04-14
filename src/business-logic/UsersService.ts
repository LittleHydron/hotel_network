import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersService } from '@interfaces/business-logic/IUsersService';

@Injectable()
export class UsersService implements IUsersService{

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ){}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = new UserEntity(user);
    const newId = (await this.usersRepository.find()).reduce((max, user) => user.id > max ? user.id : max, 0) + 1;
    newUser.id = newId;
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({id});
  }

  async update(id: number, changedUser: Partial<UserEntity>) {
    let user = await this.usersRepository.findOneBy({id});
    user.id = id;
    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<UserEntity> {
    let removedUser = await this.usersRepository.findOneBy({id});
    await this.usersRepository.remove(removedUser);
    return removedUser;
  }

  async exportFromCSVToDB() {
    let users: UserEntity[] = await UserEntity.parseObjectsFromCSV();
    for (let user of users) {
      console.log("Saving user: ", user);
      await this.usersRepository.save(user);
    }
  }

  static getFields() {
    return UserEntity.getFields();
  }
}
