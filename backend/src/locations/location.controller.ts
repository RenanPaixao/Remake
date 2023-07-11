import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateLocationDto } from './dto';
import { LocalsService } from './location.service';

@Controller('locations')
export class LocalsController {
  constructor(
    private localsService: LocalsService,
    private companyService: CompaniesService,
  ) {}

  @Post()
  async create(@Body() params: CreateLocationDto) {
    try {
      const company = await this.companyService.getOne(params.companyId);
      return this.localsService.create({ company, ...params });
    } catch (error) {
      console.log(error);
    }
  }
}
