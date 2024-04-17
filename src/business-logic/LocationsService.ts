import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationEntity } from '@entities/LocationEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILocationsService } from '@interfaces/business-logic/ILocationsService';

@Injectable()
export class LocationsService implements ILocationsService{

  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationsRepository: Repository<LocationEntity>,
  ){}

  async create(location: Partial<LocationEntity>): Promise<LocationEntity> {
    const newLocation = new LocationEntity(location);
    const newId = (await this.locationsRepository.find()).reduce((max, location) => location.id > max ? location.id : max, 0) + 1;
    newLocation.id = newId;
    return await this.locationsRepository.save(newLocation);
  }

  async findAll() {
    return this.locationsRepository.find();
  }

  async findOne(id: number) {
    return this.locationsRepository.findOneBy({id});
  }

  async update(id: number, changedLocation: Partial<LocationEntity>): Promise<LocationEntity> {
    let location = await this.locationsRepository.findOneBy({id});
    location.id = id;
    Object.assign(location, changedLocation);
    await this.locationsRepository.update(id, location);
    return location;
  }

  async remove(id: number): Promise<LocationEntity> {
    let removedLocation = await this.locationsRepository.findOneBy({id});
    await this.locationsRepository.remove(removedLocation);
    return removedLocation;
  }

  async exportFromCSVToDB() {
    let locations: LocationEntity[] = await LocationEntity.parseObjectsFromCSV();
    for (let location of locations) {
      console.log("Saving location: ", location);
      await this.locationsRepository.save(location);
    }
    return {message: "Locations imported from CSV"};
  }

  static getFields() {
    return LocationEntity.getFields();
  }

  async dropTable(): Promise<any> {
    await this.locationsRepository.clear();
    return {message: "Locations table dropped"};
  }
}
