import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Welcome from './components/Welcome'
import './App.css';
import AlgoCalc from './components/AlgoCalc'

function App() {
  // user data if the a user is logged in 
  const [currentUser, setCurrentUser] = useState(null)

  // check .env
  console.log(process.env.REACT_APP_SERVER_URL)

  // useEffect if the user navigates away and comes back, look for a jwt
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      // set the current usr if jwt is found
      setCurrentUser(jwt.decode(token))
    } else {
      // double check that current user is null if the jwt is not found 
      setCurrentUser(null)
    }
  }, [])

  // function to delete jwt from local storage to log user out
  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
    }
  }

  return (
    <Router>

    <header>
      <Navbar currentUser={ currentUser } handleLogout={ handleLogout } />
    </header>

    <div className="App">
        <Routes>
          <Route 
            path='/register'
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
          />

          <Route 
            path='/login'
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
          />

{/*           
           pre-refactor
           <Route 
            path="/profile" 
            element={<Profile currentUser={ currentUser } />}
           />  */}
         


          <Route 
            path="/profile" 
            // this is how you auth lock a route -- conditionall render a Navigate 
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={ currentUser } /> : <Navigate to="/login" /> }
          />

          <Route 
            exact path="/" 
            element={<Welcome />} 
            />
          <Route 
            exact path="/calc" 
            element={<AlgoCalc />} 
            />
        </Routes>
    </div>

  </Router>
  );
}

export default App;
