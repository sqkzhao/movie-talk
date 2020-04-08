import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Router } from '@reach/router';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import MovieDetailsVideos from './components/MovieDetailsVideos';
import MovieDetailsInfo from './components/MovieDetailsInfo';
import MovieDetailsReview from './components/MovieDetailsReview';
import Chat from './components/Chat';
import Search from './components/Search';
import SearchMovieBar from './components/SearchMovieBar'
import SearchMovieResult from './components/SearchMovieResult'
import SearchKeyword from './components/SearchKeyword'
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const [currentUser, setCurrentUser] = useState(null)  // CURRENT LOGIN USER
  const [currentUID, setCurrentUID] = useState("5e8659dacd77aa1e69961ff1")  // CURRENT USER ID  ///TEMP////////////////
  const [recentlyViewed, setRecentlyViewed] = useState([])

  ////////GET - TEMP //////////////////
  useEffect(() => {
    axios.get('http://localhost:8000/users/' + currentUID)
      .then(res => {
        console.log(res.data)
        setCurrentUser(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  /////////////////////////////////////
  
  return (
    <div style={{background: "#ffc107"}}>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
        <Navbar.Brand><Link to="/"><span className="text-white"><i className="fas fa-film"></i><strong> MOVIE TALK!</strong></span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/"><span className="text-light">Home</span></Link></Nav.Link>
            <NavDropdown title="Movies" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to='/searchmovies#popular'>Popular</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/searchmovies#upcoming'>Upcoming</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/searchmovies#toprated'>Top Rated</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link><Link to="/profile"><span className="text-light">My Profile</span></Link></Nav.Link>
            <Nav.Link><Link to="/sign_up"><span className="text-light">Sign Up</span></Link></Nav.Link>
            <Nav.Link><Link to="/sign_in"><span className="text-light">Sign In</span></Link></Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <SearchMovieBar />

      <Router>
        <Home path='/' />
        <Search path='/searchmovies' />
        <SearchMovieResult path='/searchmovies/:keyword' />
        <SearchKeyword path='/searchKeyword/:keyword' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id/' currentUser={currentUser} setCurrentUser={setCurrentUser} recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed}>
          <MovieDetailsOverview path='overview' />
          <MovieDetailsVideos path='videos' />
          <MovieDetailsInfo path='info' />
          <MovieDetailsReview path='reviews' />
          <SearchTheaters path='theaters' />
        </MovieDetails>
        <Profile path='/profile' currentUser={currentUser} setCurrentUser={setCurrentUser} recentlyViewed={recentlyViewed} />
        <SignUp path='/sign_up'/>
        <SignIn path='/sign_in' setCurrentUser={setCurrentUser} />
      </Router>

      <Chat />

    </div>
  );
}

export default App;
