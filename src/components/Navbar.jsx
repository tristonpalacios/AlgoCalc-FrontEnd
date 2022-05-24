import { Link } from 'react-router-dom' 

import { Navbar,Container,Button } from 'react-bootstrap'


export default function Nav(props) {
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
    <Container>
    <Navbar expand="lg" variant="light" bg="light" className='Nav mx-auto'>
      <Container>
        <Navbar.Brand href="/calc">Algo Calc</Navbar.Brand>
        <Button className='LoginReg'>
        <Navbar.Brand className='ms-auto' href="/login">Login |</Navbar.Brand>
        <Navbar.Brand href="/Register">Register</Navbar.Brand>
        </Button>
  
        
      </Container>
    </Navbar>
  </Container>
    
  )
}