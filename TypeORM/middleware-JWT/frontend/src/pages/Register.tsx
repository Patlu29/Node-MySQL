import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/login");
  };
  return (
    <div>
      <form action="submit">
        <div>
            <label htmlFor="userName">UserName: </label>
            <input type="text" name="userName" required placeholder="UserName" />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" name="login" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button>Register</button>
      </form>
      <p>
        Already have an account{" "}
        <a onClick={loginNavigate} style={{ cursor: "pointer" }}>
          Login?
        </a>
      </p>
    </div>
  );
};

export default Register;
