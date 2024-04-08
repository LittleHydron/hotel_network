import { Module } from '@nestjs/common';
import { RoomsService } from '@business-logic/RoomsService';
import { RoomsController } from '@presentation/RoomsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '@entities/RoomEntity';
import { IRoomsService } from '@interfaces/business-logic/IRoomsService';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomsController],
  providers: [{
    provide: IRoomsService,
    useClass: RoomsService,
  }],
})
export class RoomsModule {}
