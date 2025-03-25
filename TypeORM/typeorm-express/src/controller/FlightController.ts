import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Flight } from "../entity/Flight";
import { request } from "http";

const FlightRepository = AppDataSource.getRepository(Flight);

export class FlightController {
  async AllFlights(
    request: Request<any>,
    response: Response<any>,
    next: NextFunction
  ) {
    // return FlightRepository.find()
    try {
      const flights = await FlightRepository.find();

      return response.status(200).json({
        message: "Flights fetched successfully",
        data: flights,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async Flight(
    request: Request<any>,
    response: Response<any>,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);

      if (isNaN(id)) {
        return response.status(400).json({ message: "Invalid flight ID" });
      }

      const flight = await FlightRepository.findOne({
        where: { id },
      });

      if (!flight) {
        return response.status(404).json({ message: "Flight not found" });
      }

      return response.status(200).json({
        message: "Flight fetched successfully",
        data: flight,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async NewFlight(
    request: Request<any>,
    response: Response<any>,
    next: NextFunction
  ) {
    try {
      const { F_number, F_name, Destination, IsActive } = request.body;

      // You can add more validation here if required
      if (!F_number || !F_name || !Destination) {
        return response
          .status(400)
          .json({ message: "Missing required fields" });
      }

      const flight = Object.assign(new Flight(), {
        F_number,
        F_name,
        Destination,
        IsActive,
      });

      const savedFlight = await FlightRepository.save(flight);

      return response.status(201).json({
        message: "Flight created successfully",
        data: savedFlight,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async DeleteFlight(
    request: Request<any>,
    response: Response<any>,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);

      if (isNaN(id)) {
        return response.status(400).json({ message: "Invalid flight ID" });
      }

      const flightToRemove = await FlightRepository.findOneBy({ id });

      if (!flightToRemove) {
        return response.status(404).json({ message: "Flight not found" });
      }

      await FlightRepository.remove(flightToRemove);

      return response.status(200).json({
        message: "Flight deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async UpdateFlight(
    request: Request<any>,
    response: Response<any>,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);

      if (isNaN(id)) {
        return response.status(400).json({ message: "Invalid flight Id" });
      }

      const flightUpdate = await FlightRepository.findOneBy({ id: id });

      const { F_number, F_name, Destination, IsActive } = request.body;

      flightUpdate.F_number = F_number;
      flightUpdate.F_name = F_name;
      flightUpdate.Destination = Destination;
      flightUpdate.IsActive = IsActive;

      const updatedFlight = await FlightRepository.save(flightUpdate);

      if (!flightUpdate) {
        return response.status(404).json({ message: "Flight not found" });
      }

      return response
        .status(200)
        .json({ message: "Flight Updated", data: updatedFlight });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
