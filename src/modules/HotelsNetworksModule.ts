import { Module } from '@nestjs/common';
import { HotelsNetworksService } from '@business-logic/HotelsNetworksService';
import { HotelsNetworksController } from '@presentation/HotelsNetworksController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsNetworkEntity } from '@entities/HotelsNetworkEntity';
import { IHotelsNetworksService } from '@interfaces/business-logic/IHotelsNetworksService';
import { HotelEntity } from '@entities/HotelEntity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelsNetworkEntity, HotelEntity])],
  controllers: [HotelsNetworksController],
  providers: [{
    provide: IHotelsNetworksService,
    useClass: HotelsNetworksService,
  }],
})
export class HotelsNetworksModule {}
