import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Users from "./Users";

interface Users {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string;
}

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      
      const adminResponce = await axios.get(
        "http://localhost:3900/auth/users",{
          headers:{Authorization :`Bearer ${token}`}
        }
      );
      console.log(adminResponce.data);
      setTab(false)
      const UsersData: Users[] = adminResponce.data.data.map((user: Users) => ({
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        role: user.role,
      }));
      setData(UsersData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <p>Wakeup daddy's home</p>
      <form action="submit" onSubmit={handleSubmit}>
        <button type="submit">Users</button>
      </form>
      <div>
        {tab ? (
          ""
                ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">ID</th>
                <th align="left">UserName</th>
                <th align="left">Email</th>
                <th align="left">Password</th>
                <th align="left">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.password ? "Active" : "Inactive"}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Home;
