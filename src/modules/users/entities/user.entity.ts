import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User, UserResponse } from '../models/user.models';

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

  @Column('bigint')
  public createdAt: number;

  @Column('bigint')
  public updatedAt: number;

  public toResponse(): UserResponse {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: parseInt(`${this.createdAt}`),
      updatedAt: parseInt(`${this.updatedAt}`),
    };
  }

  public getUserInfo(): User {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      password: this.password,
      createdAt: parseInt(`${this.createdAt}`),
      updatedAt: parseInt(`${this.updatedAt}`),
    };
  }
}
