import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { LocationEntity } from '@entities/LocationEntity';
import { ILocationsService } from '@interfaces/business-logic/ILocationsService';
import { ILocationsController } from '@interfaces/presentation/ILocationsController';

@Controller('locations')
export class LocationsController implements ILocationsController{
  constructor(@Inject(ILocationsService) private readonly locationsService: ILocationsService) {}

  @Post()
  async create(@Body() location: Partial<LocationEntity>) {
    return this.locationsService.create(location);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.locationsService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() location: Partial<LocationEntity>) {
    return this.locationsService.update(Number(id), location);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LocationEntity> {
    return await this.locationsService.remove(Number(id));
  }
}
