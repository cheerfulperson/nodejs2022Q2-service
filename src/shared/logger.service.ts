import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LoggerFilesService } from './logger-files.service';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private logsLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
  private loggerFilesService = new LoggerFilesService();

  constructor() {
    super();
    this.setLogLevels(
      this.logsLevels.filter(
        (value, i) => i <= parseInt(process.env.LOGGER_LEVEL),
      ),
    );
  }

  public detectLog(message: any, ...optionalParams: any[]) {
    const statusCode: string = `${optionalParams[0]}`.split('')[0];

    switch (statusCode) {
      case '2':
        this.log(message, ...optionalParams);
        break;
      case '3':
        this.log(message, ...optionalParams);
        break;
      case '4':
        this.warn(message, ...optionalParams);
        this.error(message, ...optionalParams);
        break;
      case '5':
        this.warn(message, ...optionalParams);
        this.error(message, ...optionalParams);
        this.verbose(message, ...optionalParams);
        break;
      default:
        break;
    }
  }

  public log(message: any, ...optionalParams: any[]): void {
    if (!this.checkAcces('log')) return;
    this.loggerFilesService.write(message, 'log');
    super.log(message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]) {
    if (!this.checkAcces('error')) return;
    this.loggerFilesService.write(message, 'error');
    super.error(message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]) {
    if (!this.checkAcces('warn')) return;
    this.loggerFilesService.write(message, 'warn');
    super.warn(message, ...optionalParams);
  }

  public debug(message: string, ...optionalParams: any[]): void {
    if (!this.checkAcces('debug')) return;
    this.loggerFilesService.write(message, 'debug');
    super.warn(message, ...optionalParams);
  }

  public verbose(message: any, ...optionalParams: any[]) {
    if (!this.checkAcces('verbose')) return;
    this.loggerFilesService.write(message, 'verbose');
    super.verbose(message, ...optionalParams);
  }

  private checkAcces(logLevel: string): boolean {
    return !!this.logsLevels.find((level) => logLevel === level);
  }
}
