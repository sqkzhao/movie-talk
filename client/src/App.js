import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">MOVIE TALK!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            <NavDropdown title="Movies" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Popular</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Upcoming</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Top Rated</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Sign In</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Sing in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>






      <Router>
        <Home path='/' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id' />
      </Router>
    </div>
  );
}

export default App;
