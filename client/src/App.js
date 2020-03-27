import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import MovieDetailsVideos from './components/MovieDetailsVideos';
import MovieDetailsInfo from './components/MovieDetailsInfo';
import MovieDetailsReview from './components/MovieDetailsReview';
import Chat from './components/Chat'

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from './components/Search'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (

    <div style={{background:"rgb(255,193,7)"}}>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">MOVIE TALK!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Movies" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/searchmovies#popular">Popular</NavDropdown.Item>
              <NavDropdown.Item href="/searchmovies#upcoming">Upcoming</NavDropdown.Item>
              <NavDropdown.Item href="/searchmovies#toprated">Top Rated</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/sign_up">Sign Up</Nav.Link>
            <Nav.Link href="/sign_in">Sign In</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>


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
