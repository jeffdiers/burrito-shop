import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Burrito } from "../entity/Burrito";
import { AppDataSource } from "../../util/data-source";
import { type Repository } from "typeorm";

@Resolver(() => Burrito)
export class BurritoResolver {
  private readonly burritoRepository: Repository<Burrito>;

  constructor() {
    this.burritoRepository = AppDataSource.getRepository(Burrito);
  }

  /**
   * Creates a new burrito in the database.
   * @param name
   * @param size
   * @param price
   * @returns {Promise<Burrito>} A promise that resolves to a burrito.
   */
  @Mutation(() => Burrito)
  async createBurrito(
    @Arg("name") name: string,
    @Arg("size") size: string,
    @Arg("price") price: number
  ): Promise<Burrito> {
    const burrito = this.burritoRepository.create({ name, size, price });
    await this.burritoRepository.save(burrito);
    return burrito;
  }

  /**
   * Update a burrito in the database.
   * @param id
   * @param name
   * @param size
   * @param price
   * @returns {Promise<Burrito>} A promise that resolves to a burrito.
   */
  @Mutation(() => Burrito)
  async updateBurrito(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("size") size: string,
    @Arg("price") price: number
  ): Promise<Burrito> {
    const burrito = await this.burritoRepository.findOneBy({ id });
    if (!burrito) {
      throw new Error("Burrito not found");
    }

    burrito.name = name;
    burrito.size = size;
    burrito.price = price;

    await this.burritoRepository.save(burrito);
    return burrito;
  }

  /**
   * Deletes a burrito from the database.
   * @param id
   * @returns {Promise<Burrito>} A promise that resolves to a burrito.
   */
  @Mutation(() => Burrito)
  async deleteBurrito(@Arg("id") id: number): Promise<Burrito> {
    const burrito = await this.burritoRepository.findOneBy({ id });
    if (!burrito) {
      throw new Error("Burrito not found");
    }

    await this.burritoRepository.delete(burrito);
    return burrito;
  }

  /**
   * Fetches a burrito by ID from the database.
   * @param id
   * @returns {Promise<Burrito | undefined>} A promise that resolves to a burrito.
   */
  @Query(() => Burrito, { nullable: true })
  async getBurritoById(@Arg("id") id: number): Promise<Burrito | null> {
    const burrito = await this.burritoRepository.findOneBy({ id });
    return burrito || null;
  }

  /**
   * Fetches all burritos from the database.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   **/
  @Query(() => [Burrito])
  async burritos(): Promise<Burrito[]> {
    return await this.burritoRepository.find();
  }
}
