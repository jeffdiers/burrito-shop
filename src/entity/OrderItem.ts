import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Burrito } from "./Burrito";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Burrito)
  @JoinColumn({ name: "burrito_fk" })
  burrito: Burrito;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
