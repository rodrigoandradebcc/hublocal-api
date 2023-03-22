import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { LocationsController } from './locations/locations.controller';
import { UsersController } from './users/users.controller';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LocationsModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController, LocationsController],
  providers: [AppService],
})
export class AppModule {}
