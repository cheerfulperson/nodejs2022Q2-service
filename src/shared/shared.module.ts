import { Global, Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { LoggerFilesService } from './logger-files.service';
import { CustomLoggerService } from './logger.service';

@Global()
@Module({
  providers: [CryptoService, CustomLoggerService, LoggerFilesService],
  exports: [CryptoService, CustomLoggerService],
})
export class SharedModule {}
