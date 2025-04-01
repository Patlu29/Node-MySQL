import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Entrance from './pages/Entrance'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Entrance />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </Router>
  )
}

export default App
