import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Router, navigate } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

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


function App() {
  const [currentUser, setCurrentUser] = useState(null)  // CURRENT LOGIN USER 
  const [currentUserId, setCurrentUserId] = useState("")
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // GET CURRENT USER
  useEffect(() => {
    if(currentUserId != "") {
      axios.get('http://localhost:8000/users/' + currentUserId, {withCredentials:true})
        .then(res => {
          setCurrentUser(res.data)
        })
        .catch(err => console.log(err))
      }
  }, [currentUserId])
  
  const logoutHandler = (e) => {
    e.preventDefault()
    setCurrentUser(null)
    setCurrentUserId("")
    navigate('/')
    axios.get('http://localhost:8000/logout')
      .then(res => {
          setRecentlyViewed([])
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{background: "#ffc107", height: "100vh", overflow: "auto", mb: "0"}}>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
        <Navbar.Brand><Link to="/"><span className="text-white"><i className="fas fa-film"></i><strong> MOVIE TALK!</strong></span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/"><span className="text-light">Home</span></Link></Nav.Link>
            <NavDropdown title="Movies" id="collasible-nav-dropdown" >
              <NavDropdown.Item><Link to='/searchmovies#popular'>Popular</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/searchmovies#upcoming'>Upcoming</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/searchmovies#toprated'>Top Rated</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
              {currentUserId!="" ? 
              <>
                <Nav.Link><Link to="/profile"><i className="far fa-user-circle text-white h4"></i></Link></Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </> :
              <>
                <Nav.Link><Link to="/sign_up"><span className="text-light">Sign Up</span></Link></Nav.Link>
                <Nav.Link><Link to="/sign_in"><span className="text-light">Sign In</span></Link></Nav.Link>
              </>}
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
        <Profile path='/profile' currentUser={currentUser} setCurrentUser={setCurrentUser} setCurrentUserId={setCurrentUserId} recentlyViewed={recentlyViewed} />
        <SignUp path='/sign_up' />
        <SignIn path='/sign_in' setCurrentUserId={setCurrentUserId} />
      </Router>

      <Chat />

    </div>
  );
}

export default App;
