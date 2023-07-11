import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Location)
    private companiesRepository: Repository<Location>,
  ) {}
  async create(params: any) {
    const location = this.companiesRepository.create(params);

    await this.companiesRepository.save(location);

    return location;
  }
}
