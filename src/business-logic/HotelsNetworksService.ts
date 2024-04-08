import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HotelsNetworkEntity } from '@entities/HotelsNetworkEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { IHotelsNetworksService } from '@interfaces/business-logic/IHotelsNetworksService';

@Injectable()
export class HotelsNetworksService implements IHotelsNetworksService{

  constructor(
    @InjectRepository(HotelsNetworkEntity)
    private readonly hotelsNetworksRepository: Repository<HotelsNetworkEntity>,
  ){}

  async create(hotelsNetwork: Partial<HotelsNetworkEntity>) {
    const newHotelsNetwork = new HotelsNetworkEntity(hotelsNetwork);
    const newId = (await this.hotelsNetworksRepository.find()).reduce((max, hotelsNetwork) => hotelsNetwork.id > max ? hotelsNetwork.id : max, 0) + 1;
    newHotelsNetwork.id = newId;
    await this.hotelsNetworksRepository.save(newHotelsNetwork);
  }

  async findAll() {
    return this.hotelsNetworksRepository.find();
  }

  async findOne(id: number) {
    return this.hotelsNetworksRepository.findOneBy({id});
  }

  async update(id: number, changedHotelsNetwork: Partial<HotelsNetworkEntity>) {
    let hotelsNetwork = await this.hotelsNetworksRepository.findOneBy({id});
    hotelsNetwork.id = id;
    await this.hotelsNetworksRepository.save(hotelsNetwork);
  }

  async remove(id: number) {
    return this.hotelsNetworksRepository.delete({id});
  }

  async exportFromCSVToDB() {
    let hotelsNetworks: HotelsNetworkEntity[] = await HotelsNetworkEntity.parseObjectsFromCSV();
    for (let hotelsNetwork of hotelsNetworks) {
      console.log("Saving hotelsNetwork: ", hotelsNetwork);
      await this.hotelsNetworksRepository.save(hotelsNetwork);
    }
  }
}
