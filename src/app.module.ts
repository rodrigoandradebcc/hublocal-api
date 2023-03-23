import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { LocationsController } from './modules/locations/locations.controller';
import { LocationsModule } from './modules/locations/locations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    CompaniesModule,
    AuthModule,
    LocationsModule,
    UsersModule,
  ],
  controllers: [AppController, LocationsController],
  providers: [AppService],
})
export class AppModule {}
