import Flight from "./pages/Flight";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Flight />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
