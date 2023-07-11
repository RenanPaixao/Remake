import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async getOne(@Param() params: GetOneCompanyDto, @Res() response: Response) {
    try {
      return this.companiesService.getOne(params.id);
    } catch (error) {
      console.log('Error on getOne => ', error);
      response.status(400).json({
        message: 'Erro ao tentar encontrar uma empresa!',
        error,
      });
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      return this.companiesService.findAll();
    } catch (error) {
      console.log('Error on findAll => ', error);
      return response
        .status(400)
        .json({ message: 'Erro ao tentar listar!', error });
    }
  }

  @Post()
  async create(@Body() params: CreateCompanyDto, @Res() response: Response) {
    try {
      return this.companiesService.create(params);
    } catch (error) {
      console.log('Error on create company => ', error);
      return response
        .status(400)
        .json({ message: 'Erro ao tentar criar uma companhia!', error });
    }
  }

  @Delete(':id')
  async delete(@Param() params: DeleteCompanyDto, @Res() response: Response) {
    try {
      return this.companiesService.delete(params.id);
    } catch (error) {
      console.log('Error on create company => ', error);
      return response
        .status(400)
        .json({ message: 'Erro ao tentar deletar uma companhia!', error });
    }
  }

  @Put(':id')
  async update(
    @Body() params: UpdateCompanyDto,
    @Param('id') id: number,
    @Res() response: Response,
  ) {
    try {
      return this.companiesService.update({ ...params, id });
    } catch (error) {
      console.log('Error on update company => ', error);
      return response
        .status(400)
        .json({ message: 'Erro ao tentar atualizar uma companhia!', error });
    }
  }
}
