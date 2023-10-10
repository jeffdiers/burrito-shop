import { AppDataSource } from "../../util/data-source";
import { Burrito } from "../../src/entity/Burrito";
import { DataSource, Repository } from "typeorm";

describe("Burrito Entity", () => {
  let connection: DataSource;
  let burritoRepository: Repository<Burrito>;

  beforeEach(async () => {
    connection = await AppDataSource.initialize();
    burritoRepository = connection.manager.getRepository(Burrito);
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create a new burrito", async () => {
    const newBurrito = new Burrito();
    newBurrito.name = "Test Burrito";
    newBurrito.size = "Regular";
    newBurrito.price = 4.99;

    const savedBurrito = await burritoRepository.save(newBurrito);

    expect(savedBurrito).toBeDefined();
    expect(savedBurrito.name).toEqual(newBurrito.name);
  });

  it("should fetch a burrito", async () => {
    const newBurrito = new Burrito();
    newBurrito.name = "Test Burrito - 2";
    newBurrito.size = "Regular";
    newBurrito.price = 4.99;

    await burritoRepository.save(newBurrito);

    const foundBurrito = await burritoRepository.findOne({
      where: {
        id: newBurrito.id,
      },
    });

    expect(foundBurrito).toBeDefined();
    expect(foundBurrito.name).toEqual(newBurrito.name);
  });
});
