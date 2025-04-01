import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const registerNavigate = () => {
        navigate('/register')
    }
    return (
        <div>
            <form action="submit">
                <div>
                <label htmlFor="email">Email :</label>
                <input type="email" name="login" placeholder="Email" required/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" placeholder="Password" required/>
                </div>
                <button>Login</button>
            </form>
            <p>Don't have an account <a onClick={registerNavigate} style={{cursor: 'pointer'}}>Register?</a></p>
        </div>
    )
}

export default Login