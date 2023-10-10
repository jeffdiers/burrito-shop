import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Burrito } from "../entity/Burrito";
import { AppDataSource } from "../../util/data-source";
import { type Repository } from "typeorm";

@Resolver((_of) => Burrito)
export class BurritoResolver {
  private readonly burritoRepository: Repository<Burrito>;

  constructor() {
    this.burritoRepository = AppDataSource.getRepository(Burrito);
  }

  /**
   * Fetches all users from the database.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   **/
  @Query((_returns) => [Burrito])
  async burritos(): Promise<Burrito[]> {
    return await this.burritoRepository.find();
  }

  // @Query(() => User)
  // async user(@Arg("id") id: number): Promise<User | undefined> {
  //   // Implement your logic to fetch a user by ID from the database
  //   const user = await User.findOne(id);
  //   return user;
  // }

  // @Mutation(() => User)
  // async createUser(@Arg("name") name: string): Promise<User> {
  //   // Implement your logic to create a user and save it to the database
  //   const user = User.create({ name });
  //   await user.save();
  //   return user;
  // }
}
