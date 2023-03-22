import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { join } from 'path';

interface TypeOrmConfigCli {
  migrationsDir: string;
  entitiesDir?: string;
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
  entities: [path.resolve(__dirname, '..', '**', '..', '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  logging: ['query', 'error'],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
};
