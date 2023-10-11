import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";
import { OrderItem } from "./OrderItem";

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true }) // Enable cascading delete
  @JoinColumn()
  @Field(() => [OrderItem])
  items: OrderItem[];

  // Method to calculate the total price
  @Field(() => Float)
  async totalPrice(): Promise<number> {
    let totalPrice = 0;

    if (this.items) {
      for (const orderItem of this.items) {
        if (orderItem.burrito) {
          totalPrice += orderItem.burrito.price * orderItem.quantity;
        }
      }
    }

    return totalPrice;
  }
}
