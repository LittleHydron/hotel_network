import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoomEntity } from '@entities/RoomEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoomsService } from '@interfaces/business-logic/IRoomsService';

@Injectable()
export class RoomsService implements IRoomsService{

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ){}

  async create(room: Partial<RoomEntity>): Promise<RoomEntity> {
    const newRoom = new RoomEntity(room);
    const newId = (await this.roomsRepository.find()).reduce((max, room) => room.id > max ? room.id : max, 0) + 1;
    newRoom.id = newId;
    return await this.roomsRepository.save(newRoom);
  }

  async findAll() {
    return this.roomsRepository.find();
  }

  async findOne(id: number) {
    return this.roomsRepository.findOneBy({id});
  }

  async update(id: number, changedRoom: Partial<RoomEntity>): Promise<RoomEntity> {
    let room = await this.roomsRepository.findOneBy({id});
    room.id = id;
    Object.assign(room, changedRoom);
    await this.roomsRepository.update(id, room);
    return room;
  }

  async remove(id: number):  Promise<RoomEntity> {
    let removedRoom = await this.roomsRepository.findOneBy({id});
    await this.roomsRepository.remove(removedRoom);
    return removedRoom;
  }

  async exportFromCSVToDB() {
    let rooms: RoomEntity[] = await RoomEntity.parseObjectsFromCSV();
    for (let room of rooms) {
      console.log("Saving room: ", room);
      await this.roomsRepository.save(room);
    }
    return {message: "Rooms imported from CSV"};
  }

  static getFields() {
    return RoomEntity.getFields();
  }

  async dropTable(): Promise<any> {
    await this.roomsRepository.clear();
    return {message: "Rooms table dropped"};
  }
}
