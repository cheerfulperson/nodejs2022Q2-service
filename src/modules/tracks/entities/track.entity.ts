import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'character varying', default: null })
  public artistId: string;

  @Column({ type: 'character varying', default: null })
  public albumId: string;

  @Column()
  public duration: number;
}
