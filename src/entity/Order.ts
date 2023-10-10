import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { OrderItem } from "./OrderItem";

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column("decimal", { precision: 10, scale: 2 })
  @Field()
  totalCost: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  @JoinColumn()
  @Field(() => [OrderItem])
  items: OrderItem[];
}
