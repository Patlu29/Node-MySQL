import { FlightController } from "./controller/FlightController";
import { Router } from "express";

export const route = Router();
const flightController = new FlightController();

route.post("/newFlight", flightController.NewFlight.bind(flightController));
route.get("/allFlight", flightController.AllFlights.bind(flightController));
route.get("/flight/:id", flightController.Flight.bind(flightController));
route.delete(
  "/flight/:id",
  flightController.DeleteFlight.bind(flightController)
);
route.put("/flight/:id", flightController.UpdateFlight.bind(flightController));
