import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CompaniesController } from './companies/companies.controller';
import { LocationsController } from './locations/locations.controller';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [
    AppController,
    UsersController,
    CompaniesController,
    LocationsController,
  ],
  providers: [AppService],
})
export class AppModule {}
