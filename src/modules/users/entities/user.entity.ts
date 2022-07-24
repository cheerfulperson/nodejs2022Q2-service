import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserResponse } from '../models/user.models';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @Column()
  public version: number;

  @Column()
  public createdAt: number;

  @Column()
  public updatedAt: number;

  public toResponse(): UserResponse {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
