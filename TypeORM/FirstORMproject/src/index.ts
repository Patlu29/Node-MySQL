import { AppDataSource } from "./data-source";
import { Flight } from "./entity/Flight";

AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(Flight);

    // INSERT

    // console.log("Inserting a new user into the database...")
    // await repository.insert({
    //     F_number: 953058,
    //     F_name: "Indigo",
    //     Destination: "Mumbai",
    //     IsActive: false,
    // })

    // UPDATE

    // console.log("Updating a user into database....");
    // await repository.update(9, {
    //     F_name: "Boeing"
    // })

    // DELETE

    // console.log("Deleting a flight details.....")
    // await repository.delete(8)

    console.log("Loading all flights from the database...");
    const flights = await AppDataSource.manager.find(Flight);
    console.log("Loaded flights: ", flights);

    //   console.log("Here you can setup and run express / fastify / any other framework.")
  })
  .catch((error) => console.log(error));
