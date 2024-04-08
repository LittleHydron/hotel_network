import { Module } from '@nestjs/common';
import { HotelsService } from '@business-logic/HotelsService';
import { HotelsController } from '@presentation/HotelsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from '@entities/HotelEntity';
import { IHotelsService } from '@interfaces/business-logic/IHotelsService';
import { ReviewEntity } from '@entities/ReviewEntity';
import { RoomEntity } from '@entities/RoomEntity';
import { LocationEntity } from '@entities/LocationEntity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity, ReviewEntity, RoomEntity, LocationEntity])],
  controllers: [HotelsController],
  providers: [{
    provide: IHotelsService,
    useClass: HotelsService,
  }],
})
export class HotelsModule {}
