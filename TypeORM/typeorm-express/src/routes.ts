import { FilghtController } from "./controller/FlightController"
import { Router } from "express";

export const route = Router()
const flightController = new FilghtController()

route.post("/newFlight", flightController.NewFlight);
route.get("/allFlight",flightController.AllFlights);
route.get("/flight/:id",flightController.Flight)
route.delete("/flight/:id",flightController.DeleteFlight)
route.put("/flight/:id", flightController.UpdateFlight)
