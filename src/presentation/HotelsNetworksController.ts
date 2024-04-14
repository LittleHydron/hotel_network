import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { HotelsNetworkEntity } from '@entities/HotelsNetworkEntity';
import { IHotelsNetworksService } from '@interfaces/business-logic/IHotelsNetworksService';
import { IHotelsNetworksController } from '@interfaces/presentation/IHotelsNetworksController';

@Controller('hotelsNetworks')
export class HotelsNetworksController implements IHotelsNetworksController{
  constructor(@Inject(IHotelsNetworksService) private readonly hotelsNetworksService: IHotelsNetworksService) {}

  @Post()
  async create(@Body() hotelsNetwork: Partial<HotelsNetworkEntity>): Promise<HotelsNetworkEntity> {
    return this.hotelsNetworksService.create(hotelsNetwork);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.hotelsNetworksService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.hotelsNetworksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hotelsNetworksService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() hotelsNetwork: Partial<HotelsNetworkEntity>) {
    return this.hotelsNetworksService.update(Number(id), hotelsNetwork);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HotelsNetworkEntity> {
    return await this.hotelsNetworksService.remove(Number(id));
  }

  @Delete()
  async dropTable(): Promise<any> {
    return await this.hotelsNetworksService.dropTable();
  }
}
