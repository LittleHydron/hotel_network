import { Controller, Get } from "@nestjs/common";

import { HotelsNetworksService } from "@business-logic/HotelsNetworksService";
import { HotelsService } from "@business-logic/HotelsService";
import { RoomsService } from "@business-logic/RoomsService";
import { ReviewsService } from "@business-logic/ReviewsService";
import { UsersService } from "@business-logic/UsersService";
import { LocationsService } from "@business-logic/LocationsService";


@Controller('fields')
export class FieldsController {
  @Get('hotels')
  getHotelFields(): string[] {
    return HotelsService.getFields();
  }
  
  @Get('hotelsNetworks')
  getHotelsNetworkFields(): string[] {
    return HotelsNetworksService.getFields();
  }

  @Get('rooms')
  getRoomFields(): string[] {
    return RoomsService.getFields();
  }

  @Get('reviews')
  getReviewFields(): string[] {
    return ReviewsService.getFields();
  }

  @Get('users')
  getUserFields(): string[] {
    return UsersService.getFields();
  }

  @Get('locations')
  getLocationFields(): string[] {
    return LocationsService.getFields();
  }
}