import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  GetOneCompanyDto,
  CreateCompanyDto,
  DeleteCompanyDto,
  UpdateCompanyDto,
} from './dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get(':id')
  async getOne(@Param() params: GetOneCompanyDto) {
    try {
      return this.companiesService.getOne(params.id);
    } catch (error) {
      console.log('Error on getOne => ', error);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.companiesService.findAll();
    } catch (error) {
      console.log('Error on findAll => ', error);
    }
  }

  @Post()
  async create(@Body() params: CreateCompanyDto) {
    try {
      return this.companiesService.create(params);
    } catch (error) {
      console.log('Error on create company => ', error);
    }
  }

  @Delete(':id')
  async delete(@Param() params: DeleteCompanyDto) {
    try {
      return this.companiesService.delete(params.id);
    } catch (error) {
      console.log('Error on create company => ', error);
    }
  }

  @Put(':id')
  async update(@Body() params: UpdateCompanyDto, @Param('id') id: number) {
    try {
      return this.companiesService.update({ ...params, id });
    } catch (error) {
      console.log('Error on update company => ', error);
    }
  }
}
