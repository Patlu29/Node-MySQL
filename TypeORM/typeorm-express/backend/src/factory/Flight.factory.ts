import { setSeederFactory } from "typeorm-extension";
import { Flight } from "../entity/Flight";
import { faker } from "@faker-js/faker";

export default setSeederFactory(Flight, () => {
  const flight = new Flight();
  flight.F_number = faker.number.int(10000);
  flight.F_name = faker.company.name() + " Airlines";
  flight.Destination = faker.location.city();
  flight.IsActive = faker.datatype.boolean();
  return flight;
});
