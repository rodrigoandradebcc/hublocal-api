import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'street_name' })
  streetName: string;

  @Column({ name: 'address_number' })
  addressNumber: string;

  @Column({ name: 'neighborhood' })
  neighborhood: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'state' })
  state: string;

  @ManyToOne((type) => Company, (company) => company.location)
  company: Company;
}
