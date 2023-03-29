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

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Location, (location) => location.company)
  locations: Location[];
}
