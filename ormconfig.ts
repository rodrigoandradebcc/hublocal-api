import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { DataSource } from 'typeorm';

interface TypeOrmConfigCli {
  migrationsDir: string;
  entitiesDir?: string;
}

type Connection = Omit<PostgresConnectionOptions, 'ssl'> & {
  ssl?: any;
  autoLoadEntities?: boolean;
  cli: TypeOrmConfigCli;
};

export const connectionDev: Connection = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [
    path.resolve(
      __dirname,
      'src',
      'modules',
      '**',
      'entities',
      '*.entity.{ts,js}',
    ),
  ],
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  logging: ['query', 'error'],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
};

export const connection: Connection = {
  type: 'postgres',
  host: 'dpg-cge9aig2qv21ab3vgsa0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'localhub',
  password: 'SY60LGQO1NMYtHRopbGYqptE60UqOF2Q',
  database: 'localhub',
  ssl: true,
  entities: [
    path.resolve(
      __dirname,
      'src',
      'modules',
      '**',
      'entities',
      '*.entity.{ts,js}',
    ),
  ],
  migrations: [
    path.resolve(__dirname, 'src', 'database', 'migrations', '*.ts'),
  ],
  logging: ['query', 'error'],
  cli: {
    migrationsDir: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};

const AppDataSource = new DataSource({ ...connection });
AppDataSource.initialize().catch(console.log);
export default AppDataSource;
