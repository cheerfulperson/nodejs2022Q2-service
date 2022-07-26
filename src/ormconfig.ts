import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  cache: false,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  logging: false,
  entities: ['./src/**/entities/**.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
} as ConnectionOptions;
