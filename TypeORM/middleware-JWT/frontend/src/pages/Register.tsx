import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:3900/auth/register", {
        userName,
        email,
        password,
      });
      setSuccess("Registration successful!");
      setError("");
      setTimeout(() => {
        navigate("/login");
        alert("successfully registered");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred.");
      setSuccess("");
    }
  };
  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">UserName: </label>
          <input
            type="text"
            name="userName"
            required
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="login"
            placeholder="Email"
            required
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
