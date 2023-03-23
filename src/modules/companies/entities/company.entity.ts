import { Location } from '../../locations/entities/location.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // @ManyToOne((type) => User, (user) => user.companies)
  // user: User;

  // @OneToMany((type) => Location, (location) => location.company)
  // location: Location[];
}
