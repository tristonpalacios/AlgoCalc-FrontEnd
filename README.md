# Steps to Acheive

## App setup

* create-react-app client
  * talk about needing redirect
  * talk about jsonwebtoken package
  * talk about local storage

* install dependancies
  * axios jsonwebtoken react-router-dom
  * touch .env.local
  * populate .env.local `REACT_APP_SERVER_URL=http://localhost:3001`

* create needed components
  * mkdir components
  * touch Login.js Navbar.jsx Profile.jsx Register.jsx Welcome.jsx
* stub components

```jsx
export default function Login() {
  return (
    <div>
      hello from login
    </div>
  )
}

export default function Navbar() {
  return (
    <nav>
      hello from navbar
    </nav>
  )
}

export default function Profile() {
  return (
    <div>
      hello from profile
    </div>
  )
}

export default function Register() {
  return (
    <div>
      hello from register
    </div>
  )
}

export default function Welcome() {
  return (
    <div>
      hello from welcome
    </div>
  )
}
```

* build App.js

```jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Welcome from './components/Welcome'
import './App.css';

function App() {
  // user data if the a user is logged in 
  const [currentUser, setCurrentUser] = useState(null)

  // check .env
  console.log(process.env.REACT_APP_SERVER_URL)

  // useEffect if the user navigates away and comes back, look for a jwt

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

          
          // pre-refactor
           <Route 
            path="/profile" 
            element={<Profile currentUser={ currentUser } />}
           /> 
         


          {/* <Route 
            path="/profile" 
            // this is how you auth lock a route -- conditionall render a Navigate 
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={ currentUser } /> : <Navigate to="/login" /> } */}
          />

          <Route 
            exact path="/" 
            element={<Welcome />} 
            />
        </Routes>
    </div>

  </Router>
  );
}

export default App;
```

* build nave bar

```jsx
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav>
      <Link to="/">
        <h5>user app</h5>
      </Link>

      {/* if the user is logged in... */}
      <Link to="/">
        <span onClick={ props.handleLogout }>log out</span>
      </Link>
  
      <Link to="/profile">
        profile
      </Link>

      {/* if the user is logged out... */}
      <Link to="/register">
          register
      </Link>

      <Link to="/login">
          login
      </Link>
    </nav>
  )
}
```

## The fun stuff

* make login form

```jsx
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'

export default function Login(props) {

  // for controlled form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // submit will hit backend login endpoint
  const handleSumbit = async e => {
    try { 
      e.preventDefault()
      // post to backend with form submission
      const requestBody = {
        email: email,
        password: password
      }

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, requestBody)
      
      // destructure response
      const { token } = response.data

      // Save token to localStorage
      localStorage.setItem('jwtToken', token);

      // get user data from the token
      const decoded = jwt.decode(token)

      // set the current user in the top app state
      props.setCurrentUser(decoded)
      
    } catch(error) {
      // if the email/pass didn't match
      if(error.response.status === 400) {
        setMessage(error.response.data.msg)
      } else {
        // otherwise log the error for debug
        console.log(error)
      }
    }
  }

  // redirect to profile if user is logged in
  if(props.currentUser) return <Redirect to='/profile' component={ Profile } currentUser={ props.currentUser } />

  return (
    <div>
      <h3>Login Form:</h3>

      <p>{message}</p>

      <form onSubmit={handleSumbit}>
        <label htmlFor='email-input'>email:</label>

        <input
          id='email-input'
          type='email'
          placeholder='user@domain.com'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password-input'>password:</label>

        <input 
          id='password-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />

        <input 
          type='submit'
          value='login'
        />
      </form>
    </div>
  )
}
```

## You DO

* make registration form

```jsx
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'

export default function Signup(props) {
  // for controlled form (name, email, password)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // for flash message
  const [message, setMessage] = useState('')

  const handleSumbit = async e => {
    try { 
      e.preventDefault()
      // post to backend with form submission
      const requestBody = {
        name: name,
        email: email,
        password: password,
      }

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)
      
      // destructure response
      const { token } = response.data

      // Save token to localStorage
      localStorage.setItem('jwtToken', token);

      // get user data from the token
      const decoded = jwt.decode(token)

      // set the current user in the top app state
      props.setCurrentUser(decoded)
      
    } catch(error) {
      // if the email was found in the db
      if(error.response.status === 400) {
        setMessage(error.response.data.msg)
      } else {
        // otherwise log the error for debug
        console.log(error)
      }
    }
  }

  // redirect to the profile if the user is logged in
  if(props.currentUser) return <Redirect to='/profile' component={ Profile } currentUser={ props.currentUser } />

  return (
    <div>
      <h3>Registration Form:</h3>

      <p>{message}</p>

      <form onSubmit={handleSumbit}>
        <label htmlFor='name-input'>name:</label>

        <input
          id='name-input'
          type='text'
          placeholder='your name...'
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <label htmlFor='email-input'>email:</label>

        <input
          id='email-input'
          type='email'
          placeholder='user@domain.com'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password-input'>password:</label>

        <input 
          id='password-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />

        <input 
          type='submit'
          value='login'
        />
      </form>
    </div>
  )
}
```

* update logout

```jsx
  // in App.js

  // function to delete jwt from local storage to log user out
  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
    }
  }
```
* make profile

```jsx
import { useState, useEffect } from 'react'
import { Redirect } from 'react'
import axios from 'axios'

export default function Profile(props) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const privateMessage = async function() {
      try {
        // get the jwt from local storage
        const token = localStorage.getItem('jwtToken')
        // make auth headers
        const authHeaders = {
          'Authorization': token
        }
        // hit auth locked endpoint
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders })
        // const response = await axios.get('/')
        console.log('👾',  process.env.REACT_APP_TEST)
        // console.log('response 👾', response.data)
        setMessage(response.data.msg)
      } catch(error) {
        console.log(error)
        // log the user out if the jwt doesn't pass the auth check
        props.handleLogout()
      }
    }
  
    privateMessage()
  }, [props])

  // if auth fails redirect to login
  if(!props.currentUser) return <Redirect to='/login' component={ Profile } currentUser={ props.currentUser } />

  return (
    <div>
      <h4>hello {props.currentUser.name}</h4>
      <h5>your email is {props.currentUser.email}</h5>

      <div>
      <p>you have a secret message from the auth locked route:</p>

      <p> {message} </p>
      </div>
    </div>
  )
}
```

* update route in App.js

* Update Navbar

```jsx
import { Link } from 'react-router-dom' 

export default function Navbar(props) {
  // if the user is logged in
  const loggedIn = (
    <>
      <Link to="/">
        <span onClick={ props.handleLogout }>log out</span>
      </Link>
  
      <Link to="/profile">
        profile
      </Link>
    </>
  )

  // if the user is logged out
  const loggedOut = (
    <>
      <Link to="/signup">
      sign up
      </Link>

      <Link to="/login">
          login
      </Link>
    </>
  )

  return (
    <nav>
      <Link to="/">
        <h5>user app</h5>
      </Link>
      
      {props.currentUser ? loggedIn : loggedOut}
    </nav>
  )
}
```

* make useeffect in app.js

```jsx
import jwt from 'jsonwebtoken'
// if the user navigates away and comes back, look for a jwt
useEffect(() => {
  const token = localStorage.getItem('jwtToken')
  // better auth would be checking the jwt token on a dedicataed route
  if (token) {
    // set the current usr if jwt is found
    setCurrentUser(jwt.decode(token))
  } else {
    // double check that current user is null if the jwt is not found 
    setCurrentUser(null)
  }
}, [])
```

* YAY AUTH

* Stretch add error handling to express
* add verifacation route to backend
# AlgoCalc-FrontEnd
