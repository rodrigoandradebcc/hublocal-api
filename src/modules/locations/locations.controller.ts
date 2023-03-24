import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateLocationDto) {
    return this.locationsService.create(createCompanyDto);
  }
}
