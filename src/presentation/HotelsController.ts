import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { HotelEntity } from '@entities/HotelEntity';
import { IHotelsService } from '@interfaces/business-logic/IHotelsService';
import { IHotelsController } from '@interfaces/presentation/IHotelsController';

@Controller('hotels')
export class HotelsController implements IHotelsController{
  constructor(@Inject(IHotelsService) private readonly hotelsService: IHotelsService) {}

  @Post()
  async create(@Body() hotel: Partial<HotelEntity>) {
    return this.hotelsService.create(hotel);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.hotelsService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() hotel: Partial<HotelEntity>) {
    return this.hotelsService.update(Number(id), hotel);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.hotelsService.remove(Number(id));
  }
}
