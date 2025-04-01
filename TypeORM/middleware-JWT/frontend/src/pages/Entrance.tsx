import { useNavigate } from "react-router-dom"

const Entrance = () => {

    const navigate = useNavigate()

    const loginNavigate = () => {
        navigate('/login')
    }
    
    return (
        <div>
            <button onClick={loginNavigate}>Click me to login !</button>
        </div>
    )
}

export default Entrance