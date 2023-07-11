import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './configs/db';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
