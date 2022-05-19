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
      <Link to="/register">
      register
      </Link>

      <Link to="/login">
          login
      </Link>
      <Link to="/calc">
          Calculator
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