import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { HotelEntity } from '@entities/HotelEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IHotelsService } from '@interfaces/business-logic/IHotelsService';


@Injectable()
export class HotelsService implements IHotelsService{

  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelsRepository: Repository<HotelEntity>,
  ){}

  async create(hotel: Partial<HotelEntity>): Promise<HotelEntity> {
    const newHotel = new HotelEntity(hotel);
    const newId = (await this.hotelsRepository.find()).reduce((max, hotel) => hotel.id > max ? hotel.id : max, 0) + 1;
    newHotel.id = newId;
    return await this.hotelsRepository.save(newHotel);
  }

  async findAll() {
    return this.hotelsRepository.find();
  }

  async findOne(id: number) {
    return this.hotelsRepository.findOneBy({id});
  }

  async update(id: number, changedHotel: Partial<HotelEntity>): Promise<HotelEntity> {
    let hotel = await this.hotelsRepository.findOneBy({id});
    hotel.id = id;
    Object.assign(hotel, changedHotel);
    await this.hotelsRepository.update(id, hotel);
    return hotel;
  }

  async remove(id: number): Promise<HotelEntity> {
    let removedHotel = await this.hotelsRepository.findOneBy({id});
    await this.hotelsRepository.remove(removedHotel);
    return removedHotel;
  }

  async exportFromCSVToDB() {
    let hotels: HotelEntity[] = await HotelEntity.parseObjectsFromCSV();
    for (let hotel of hotels) {
      console.log("Saving hotel: ", hotel);
      await this.hotelsRepository.save(hotel);
    }
    return {message: "Hotels imported from CSV"};
  }

  static getFields() {
    return HotelEntity.getFields();
  }

  async dropTable(): Promise<any> {
    await this.hotelsRepository.clear();
    return {message: "Hotels table dropped"};
  }
}
