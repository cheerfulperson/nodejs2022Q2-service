import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class CryptoService {
  private secretKey = process.env.SECRET_KEY;

  public getHash(hashfrom: string) {
    return this.createHash(hashfrom);
  }

  public compareHashes(hashfrom: string, pswHash: string) {
    return this.createHash(hashfrom) === pswHash;
  }

  private createHash(hashfrom: string) {
    return createHmac('sha256', this.secretKey).update(hashfrom).digest('hex');
  }
}
