import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Order } from "./Order";
import { Burrito } from "./Burrito";

@Entity()
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => Burrito)
  @Field(() => Burrito)
  burrito: Burrito;

  @ManyToOne(() => Order, (order) => order.items)
  @Field(() => Order)
  order: Order;
}
