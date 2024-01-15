import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiscountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  percentDiscount: number;
}
