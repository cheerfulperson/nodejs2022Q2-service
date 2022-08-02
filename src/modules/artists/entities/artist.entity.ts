import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public grammy: boolean;
}
