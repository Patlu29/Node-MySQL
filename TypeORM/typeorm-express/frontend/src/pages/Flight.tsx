import axios from "axios";
import { useEffect, useState } from "react";

interface Flight {
  id: number;
  flightNumber: string;
  flightName: string;
  destination: string;
  active: boolean;
  createdAt: string | number;
}

const FlightComponent = () => {
  const [data, setData] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [flightName, setFlightName] = useState("");
  const [destination, setDestination] = useState("");
  const [active, setActive] = useState(true);

  const [flightNumbers, setFlightNumbers] = useState("");
  const [flightNames, setFlightNames] = useState("");
  const [destinations, setDestinations] = useState("");

  useEffect(() => {
    AllFlights();
  }, []);

  const handleChange = (e: any) => {
    setActive(e.target.value === "1");
  };

  const AllFlights = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3900/airPort/allflight"
      );
      const filteredData: Flight[] = response.data.data.map((post: any) => ({
        id: post.id,
        flightNumber: post.F_number,
        flightName: post.F_name,
        destination: post.Destination,
        active: !!post.IsActive,
        createdAt: post.createdAt,
      }));
      setData(filteredData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      setLoading(false);
    }
  };

  const addFlight = async (e: any) => {
    e.preventDefault();

    const existingFlight = data.find(
      (flight) => flight.flightNumber === flightNumber
    );
    if (existingFlight) {
      setError("Flight already exists");
      return;
    }

    try {
      await axios.post("http://localhost:3900/airPort/newFlight", {
        F_number: flightNumber,
        F_name: flightName,
        Destination: destination,
        IsActive: active,
      });
      AllFlights();
      setFlightNumber("");
      setFlightName("");
      setDestination("");
    } catch (err: any) {
      setError(err.message || "Failed to post data");
    }
  };

  const updateFlight = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3900/airPort/flight/${id}`, {
        F_number: flightNumbers,
        F_name: flightNames,
        Destination: destinations,
        IsActive: active,
      });
      AllFlights();
      setId("");
      setFlightNumbers("");
      setFlightNames("");
      setDestinations("");
    } catch (err: any) {
      setError(err.message || "Failed to update data");
    }
  };

  async function deleteFlight(id: number) {
    try {
      await axios.delete(`http://localhost:3900/airPort/flight/${id}`);
      AllFlights();
    } catch (err: any) {
      setError(err.message || "Failed to Delete data");
    }
  }

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Flight List</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "250px" }}>
          <form onSubmit={addFlight} style={{ justifyItems: "center" }}>
            <div>
              <label htmlFor="flightNumber">Flight Number: </label>
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="flightName">Flight Name: </label>
              <input
                type="text"
                value={flightName}
                onChange={(e) => setFlightName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="destination">Destination: </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <label>Status: </label>
              <select
                name="active"
                value={active ? 1 : 0}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <button type="submit">Add Flight</button>
          </form>
        </div>
        <div style={{ width: "250px" }}>
          <form onSubmit={updateFlight} style={{ justifyItems: "center" }}>
            <div>
              <label htmlFor="id">Id:</label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="flightNumber">Flight Number: </label>
              <input
                type="text"
                value={flightNumbers}
                onChange={(e) => setFlightNumbers(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="flightName">Flight Name: </label>
              <input
                type="text"
                value={flightNames}
                onChange={(e) => setFlightNames(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="destination">Destination: </label>
              <input
                type="text"
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
              />
            </div>
            <div>
              <label>Status: </label>
              <select
                name="active"
                value={active ? 1 : 0}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <button type="submit">Update Flight</button>
          </form>
        </div>
      </div>
      <div>
        {data.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">ID</th>
                <th align="left">Flight Number</th>
                <th align="left">Flight Name</th>
                <th align="left">Destination</th>
                <th align="left">Status</th>
                <th align="left">Created At</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.flightName}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.active ? "Active" : "Inactive"}</td>
                  <td>{flight.createdAt}</td>
                  <td>
                    <button onClick={() => deleteFlight(flight.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FlightComponent;
