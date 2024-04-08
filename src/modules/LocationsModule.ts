import { Module } from '@nestjs/common';
import { LocationsService } from '@business-logic/LocationsService';
import { LocationsController } from '@presentation/LocationsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from '@entities/LocationEntity';
import { ILocationsService } from '@interfaces/business-logic/ILocationsService';
import { ReviewEntity } from '@entities/ReviewEntity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, ReviewEntity])],
  controllers: [LocationsController],
  providers: [{
    provide: ILocationsService,
    useClass: LocationsService,
  }],
})
export class LocationsModule {}
