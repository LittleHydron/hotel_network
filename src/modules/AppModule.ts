import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/DatabaseModule';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from '@modules/RoomsModule';
import { ReviewsModule } from '@modules/ReviewsModule';
import { UsersModule } from '@modules/UsersModule';
import { LocationsModule } from '@modules/LocationsModule';
import { HotelsModule } from '@modules/HotelsModule';
import { HotelsNetworksModule } from '@modules/HotelsNetworksModule';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
