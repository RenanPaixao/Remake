import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { LocalsController } from './location.controller';
import { Location } from './location.entity';
import { LocalsService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), CompaniesModule],
  controllers: [LocalsController],
  providers: [LocalsService],
})
export class LocationsModule {}
