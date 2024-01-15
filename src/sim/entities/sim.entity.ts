import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sim')
export class SimEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  number: string;

  @Column()
  price: number;

  @Column()
  point: number;

  @Column()
  supplier: string;

  @Column()
  type: string;

  @Column()
  subcribsionType: string;

  @Column()
  node: number;

  @Column('jsonb')
  other: any;
}
