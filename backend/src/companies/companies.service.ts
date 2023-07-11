import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async getOne(id: number): Promise<Company> {
    return this.companiesRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async create(params: CreateCompanyDto) {
    const company = this.companiesRepository.create(params);

    await this.companiesRepository.save(company);

    return company;
  }

  async delete(id: number) {
    return this.companiesRepository.delete({ id } as FindOptionsWhere<Company>);
  }

  async update(params: CompanyToUpdate) {
    const { id, ...partialCompany } = params;
    return this.companiesRepository.update({ id }, partialCompany);
  }
}

type CompanyToUpdate = Partial<Company> & { id: number };
