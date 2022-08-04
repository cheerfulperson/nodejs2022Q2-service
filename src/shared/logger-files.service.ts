import { Injectable } from '@nestjs/common';
import { stat, readFile, writeFile, mkdir, access } from 'fs/promises';
import { join } from 'path';
import { LoggerFilesErrors } from './utils/logger-files.errors';

@Injectable()
export class LoggerFilesService {
  private maxFileSize = parseInt(process.env.LOG_FILES_MAX_SIZE);

  public async write(message: string, loggerType: string) {
    const pathToDir = join(__dirname, '..', '..', 'logs');
    const pathToFile = join(pathToDir, `${loggerType}.log`);
    try {
      const file = await readFile(pathToFile, 'utf-8');
      const filesSize = (await stat(pathToFile)).size / 1024;
      const filesMessages = `${file}\n${message}`;

      if (filesSize > this.maxFileSize) {
        this.write(message, `${this.getLoggerFileVersion(loggerType)}`);
        return;
      }

      writeFile(pathToFile, filesMessages, 'utf-8');
    } catch (error) {
      if (
        (<string>error.message).includes(LoggerFilesErrors.NoSuchFileToOpen)
      ) {
        this.createFile(pathToDir, pathToFile, message);
      }
    }
  }

  private async createDir(pathToDir: string) {
    try {
      await access(pathToDir);
    } catch (error) {
      await mkdir(pathToDir, { recursive: false }).catch((err) => {
        console.log(err);
      });
    }
  }

  private async createFile(
    pathToDir: string,
    pathToFile: string,
    message: string,
  ) {
    try {
      await writeFile(pathToFile, message, 'utf-8');
    } catch (error) {
      await this.createDir(pathToDir);
      await writeFile(pathToFile, message, 'utf-8');
    }
  }

  private getLoggerFileVersion(loggerType: string) {
    const type = loggerType.split('-')[0];
    let version = parseInt(loggerType.split('-')[1]) || 0;

    return `${type}-${(version += 1)}`;
  }
}
