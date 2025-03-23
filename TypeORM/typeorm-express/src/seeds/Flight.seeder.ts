import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Flight } from "../entity/Flight";


export default class FlightSeeder implements Seeder {
  track: false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(Flight);
    // await repository.insert([
    //   {
    //     F_number: 953053,
    //     F_name: "indigo",
    //     Destination: "chennai",
    //     IsActive: true,
    //     createdAt: Date(),
    //   },
    // ]);
    const userFactory = await factoryManager.get(Flight);

    await userFactory.saveMany(10);
    console.log(userFactory);
    
  }
}


