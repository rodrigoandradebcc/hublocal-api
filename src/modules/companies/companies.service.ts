import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.companyRepository.find();
  }

  findAllByUserId(id: string) {
    const companies = this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.companies', 'companies')
      .leftJoin('companies.locations', 'locations')
      .where('users.id = :id', { id })
      .select('companies.id', 'id')
      .addSelect('companies.name', 'name')
      .addSelect('COUNT(locations.id)', 'numberOfLocations')
      .groupBy('companies.id')
      .getRawMany();

    if (!companies) {
      throw new NotFoundException(`User ID ${id} not found`);
    }

    return companies;
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

  async create(createCompanyDto: CreateCompanyDto) {
    const userExist = await this.usersRepository.findOne({
      where: {
        id: createCompanyDto.userId,
      },
    });

    if (!userExist) {
      throw new NotFoundException(`User not exist`);
    }

    const company = this.companyRepository.create({
      user: userExist,
      cnpj: createCompanyDto.cnpj,
      website: createCompanyDto.website,
      name: createCompanyDto.name,
    });

    const createdCompany = await this.companyRepository.save(company);

    delete createdCompany.user;

    return createdCompany;
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
