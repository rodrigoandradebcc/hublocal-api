import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

interface TypeOrmConfigCli {
  migrationsDir: string;
}

type Connection = Omit<PostgresConnectionOptions, 'ssl'> & {
  ssl?: any;
  autoLoadEntities?: boolean;
  cli: TypeOrmConfigCli;
};

export const connection: Connection = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['./src/migrations/*.ts'],
  logging: ['query', 'error'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
