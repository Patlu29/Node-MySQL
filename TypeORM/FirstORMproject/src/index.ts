import { AppDataSource } from "./data-source"
import { Flight } from "./entity/Flight"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const flight = new Flight()
    flight.F_number = 953054
    flight.F_name = "AirIndia"
    flight.Destination = "Delhi"
    flight.IsActive = false

    await AppDataSource.manager.save(flight)
    console.log("Saved a new flight with id: " + flight.id)

    console.log("Loading all flights from the database...")
    const flights = await AppDataSource.manager.find(Flight)
    console.log("Loaded flights: ", flights)

 //   console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
