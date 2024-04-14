import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { RoomEntity } from '@entities/RoomEntity';
import { IRoomsService } from '@interfaces/business-logic/IRoomsService';
import { IRoomsController } from '@interfaces/presentation/IRoomsController';

@Controller('rooms')
export class RoomsController implements IRoomsController{
  constructor(@Inject(IRoomsService) private readonly roomsService: IRoomsService) {}

  @Post()
  async create(@Body() room: Partial<RoomEntity>) {
    return this.roomsService.create(room);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.roomsService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() room: Partial<RoomEntity>) {
    return this.roomsService.update(Number(id), room);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RoomEntity> {
    return await this.roomsService.remove(Number(id));
  }
}
