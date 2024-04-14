import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@modules/database/DatabaseModule';

import { RoomsModule } from '@modules/RoomsModule';
import { ReviewsModule } from '@modules/ReviewsModule';
import { UsersModule } from '@modules/UsersModule';
import { LocationsModule } from '@modules/LocationsModule';
import { HotelsModule } from '@modules/HotelsModule';
import { HotelsNetworksModule } from '@modules/HotelsNetworksModule';

import { FieldsController } from '@presentation/FieldsController';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    RoomsModule,
    ReviewsModule,
    UsersModule,
    LocationsModule,
    HotelsModule,
    HotelsNetworksModule
  ],
  controllers: [FieldsController],
  providers: [],
})
export class AppModule {}
