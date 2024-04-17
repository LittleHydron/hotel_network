import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UserEntity } from '@entities/UserEntity';
import { IUsersService } from '@interfaces/business-logic/IUsersService';
import { IUsersController } from '@interfaces/presentation/IUsersController';

@Controller('users')
export class UsersController implements IUsersController{
  constructor(@Inject(IUsersService) private readonly usersService: IUsersService) {}

  @Post()
  async create(@Body() user: Partial<UserEntity>) {
    return this.usersService.create(user);
  }

  @Post('from-csv')
  async exportFromCSVToDB() {
    return this.usersService.exportFromCSVToDB();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.remove(Number(id));
  }

  @Delete()
  async dropTable(): Promise<any> {
    return await this.usersService.dropTable();
  }
}
