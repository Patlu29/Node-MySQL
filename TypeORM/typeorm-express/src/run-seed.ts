import { runSeeders } from "typeorm-extension";
import { AppDataSource } from "./data-source";

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
    await runSeeders(AppDataSource);
    console.log("Seeding completed!");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seed();
