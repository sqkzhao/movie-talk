import React from 'react';
import { Link, Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import MovieDetailsVideos from './components/MovieDetailsVideos';
import MovieDetailsInfo from './components/MovieDetailsInfo';
import MovieDetailsReview from './components/MovieDetailsReview';
import Chat from './components/Chat'
import Search from './components/Search'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col, Form } from 'react-bootstrap'

function App() {
  return (
    <div style={{background:"rgb(255,193,7)"}}>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><Link to="/"><span className="text-white"><i className="fas fa-film"></i><strong> MOVIE TALK!</strong></span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/"><span className="text-light">Home</span></Link></Nav.Link>
            <NavDropdown title="Movies" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/searchmovies#popular">Popular</NavDropdown.Item>
              <NavDropdown.Item href="/searchmovies#upcoming">Upcoming</NavDropdown.Item>
              <NavDropdown.Item href="/searchmovies#toprated">Top Rated</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link><Link to="/"><span className="text-light">My Profile</span></Link></Nav.Link>
            <Nav.Link><Link to="/sign_up"><span className="text-light">Sign Up</span></Link></Nav.Link>
            <Nav.Link><Link to="/sign_in"><span className="text-light">Sign In</span></Link></Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        <Col>
          <Form.Control type="text" placeholder="Search movies.." rounded-0 />
        </Col>
      </Row>

      <Router>
        <Home path='/' />
        <Search path='/searchmovies' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id/'>
          <MovieDetailsOverview path='overview' />
          <MovieDetailsVideos path='videos' />
          <MovieDetailsInfo path='info' />
          <MovieDetailsReview path='reviews' />
          <SearchTheaters path='theaters' />
        </MovieDetails>
        <SignUp path='/sign_up'/>
        <SignIn path='/sign_in'/>
      </Router>

      <Chat />

    </div>
  );
}

export default App;
