import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT ?? 4000;
  const app = await NestFactory.create(AppModule);

  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('docs', app, parse(document));

  await app.listen(port);
  console.log(`App started on http://localhost:${port}`);
}

bootstrap();
