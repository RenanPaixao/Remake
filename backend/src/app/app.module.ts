import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { Company } from 'src/companies/company.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './configs/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    TypeOrmModule.forRoot({ ...dbConfig(), entities: [Company] }),
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
