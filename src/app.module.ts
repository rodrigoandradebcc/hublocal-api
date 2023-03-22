import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connection } from 'ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UsersController } from './modules/users/users.controller';
import { LocationsController } from './modules/locations/locations.controller';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forRoot(connection),
    LocationsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, LocationsController],
  providers: [AppService],
})
export class AppModule {}
