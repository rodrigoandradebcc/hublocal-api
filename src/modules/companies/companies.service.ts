import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    const company = this.companyRepository.findOne({
      where: {
        id,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company ID ${id} not found`);
    }

    return company;
  }

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);

    return this.companyRepository.save(company);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.preload({
      id,
      ...updateCompanyDto,
    });

    if (!company) {
      throw new NotFoundException(`Company ID ${id} not found`);
    }

    return this.companyRepository.save(company);
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company ID ${id} not found`);
    }

    return this.companyRepository.remove(company);
  }
}
