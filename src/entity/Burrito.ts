import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Burrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;
}
