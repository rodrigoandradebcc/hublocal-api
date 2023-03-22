import { Location } from 'src/locations/entities/location.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'website' })
  website: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @OneToMany((type) => Location, (location) => location.company)
  location: Location[];
}
