import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { HotelEntity } from '@entities/HotelEntity';
import { IHotelsService } from '@interfaces/business-logic/IHotelsService';
import { IHotelsController } from '@interfaces/presentation/IHotelsController';

@Controller('hotels')
export class HotelsController implements IHotelsController{
  constructor(@Inject(IHotelsService) private readonly hotelsService: IHotelsService) {}

  @Post()
  async create(@Body() hotel: Partial<HotelEntity>): Promise<HotelEntity> {
    console.log("Creating hotel request received: ", hotel);
    return await this.hotelsService.create(hotel);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    console.log("Exporting hotels from CSV to DB");
    return this.hotelsService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    console.log("Getting all hotels");
    return this.hotelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log("Getting hotel with id: ", id);
    return this.hotelsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() hotel: Partial<HotelEntity>) {
    console.log("Updating hotel with id: ", id, " with data: ", hotel);
    return this.hotelsService.update(Number(id), hotel);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HotelEntity> {
    console.log("Deleting hotel with id: ", id);
    return await this.hotelsService.remove(Number(id));
  }

  @Delete()
  async dropTable(): Promise<any> {
    console.log("Dropping hotels table");
    return await this.hotelsService.dropTable();
  }
}
