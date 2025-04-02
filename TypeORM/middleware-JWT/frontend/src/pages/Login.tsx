import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const loginResponse = await axios.post(
        "http://localhost:3900/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = loginResponse.data;
      console.log(token);

      localStorage.setItem("token", token.token);

      navigate("/home");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
      <p>{error}</p>
      <p>
        Don't have an account <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
