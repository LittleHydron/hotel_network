import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HotelEntity } from '@entities/HotelEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IHotelsService } from '@interfaces/business-logic/IHotelsService';

@Injectable()
export class HotelsService implements IHotelsService{

  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelsRepository: Repository<HotelEntity>,
  ){}

  async create(hotel: Partial<HotelEntity>) {
    const newHotel = new HotelEntity(hotel);
    const newId = (await this.hotelsRepository.find()).reduce((max, hotel) => hotel.id > max ? hotel.id : max, 0) + 1;
    newHotel.id = newId;
    await this.hotelsRepository.save(newHotel);
  }

  async findAll() {
    return this.hotelsRepository.find();
  }

  async findOne(id: number) {
    return this.hotelsRepository.findOneBy({id});
  }

  async update(id: number, changedHotel: Partial<HotelEntity>) {
    let hotel = await this.hotelsRepository.findOneBy({id});
    hotel.id = id;
    await this.hotelsRepository.save(hotel);
  }

  async remove(id: number) {
    return this.hotelsRepository.delete({id});
  }

  async exportFromCSVToDB() {
    let hotels: HotelEntity[] = await HotelEntity.parseObjectsFromCSV();
    for (let hotel of hotels) {
      console.log("Saving hotel: ", hotel);
      await this.hotelsRepository.save(hotel);
    }
  }
}
