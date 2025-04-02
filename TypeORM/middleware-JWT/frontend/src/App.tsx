import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entrance from "./pages/Entrance";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>        <Route path="/" element={<Entrance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
