import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { Company } from 'src/companies/company.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './configs/db';
import { LocationsModule } from 'src/locations/location.module';
import { Location } from 'src/locations/location.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    TypeOrmModule.forRoot({
      ...dbConfig(),
      entities: [Company, Location, User],
    }),
    CompaniesModule,
    LocationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
