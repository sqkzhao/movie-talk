import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Router, navigate } from '@reach/router';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import MapSearchTheaters from './components/MapSearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import MovieDetailsVideos from './components/MovieDetailsVideos';
import MovieDetailsInfo from './components/MovieDetailsInfo';
import MovieDetailsReview from './components/MovieDetailsReview';
import Chat from './components/Chat';
import Search from './components/Search';
import SearchMovieBar from './components/SearchMovieBar';
import SearchMovieResult from './components/SearchMovieResult';
import SearchKeyword from './components/SearchKeyword';
import MovieListByType from './components/MovieListByType';
import MovieListByGenre from './components/MovieListByGenre';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const [currentUser, setCurrentUser] = useState(null);  // CURRENT LOGIN USER 
  const [currentUserId, setCurrentUserId] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]); // MOVIES
  const [upcoming, setUpcoming] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [popular, setPopular] = useState([])

  // GET CURRENT USER
  useEffect(() => {
    if(currentUserId !== "") {
      axios.get(`http://localhost:8000/users/${currentUserId}`, {withCredentials:true})
        .then(res => {
          setCurrentUser(res.data)
        })
        .catch(err => console.log(err))
      }
  }, [currentUserId])
  
  // GET UPCOMING, NOWPLAYING & POPULAR MOVIES
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
        .then(res => {
            setUpcoming(res.data.results)   
        })
        .catch(err => console.log(err))

    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
        .then(res => {
            setNowPlaying(res.data.results)
        })
        .catch(err => console.log(err))

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
        .then(res => {
        setPopular(res.data.results)
        })
        .catch(err => console.log(err))
  }, [])

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
        <Navbar.Brand><Link to="/"><span className="text-light h4"><i className="fas fa-film"></i><strong> MOVIE TALK!</strong></span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Movies" id="collasible-nav-dropdown" className="pt-1 mx-2 h6">
              <div className="text-center pt-2">
                <Link to='/searchmovies#popular' className="text-dark">Popular</Link>
                <hr></hr>
              </div>
              <div className="text-center">
                <Link to='/movies/upcoming' className="text-dark">Upcoming</Link>
                <hr></hr>
              </div>
              <div className="text-center pb-2">
                <Link to='/movies/top_rated' className="text-dark">Top Rated</Link>
              </div>
            </NavDropdown>
          </Nav>
          <Nav>
              {currentUserId!=="" ? 
              <>
                <Link to="/profile" className="mx-2 mt-2 text-white"><i className="far fa-user-circle h4"></i></Link>
                <Nav.Link onClick={logoutHandler} className="mx-2">Logout</Nav.Link>
              </> :
              <>
                <Link to="/sign_up" className="mx-2 mt-2 text-light h6"><span className="text-light">Sign Up</span></Link>
                <Link to="/sign_in" className="mx-2 mt-2 text-light h6"><span className="text-light">Sign In</span></Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <SearchMovieBar />
      
      <Router>
        <Home path='/' upcoming={upcoming} nowPlaying={nowPlaying} popular={popular} />
        
        <Search path='/searchmovies' />
        <SearchMovieResult path='/searchmovies/:query' />
        <SearchKeyword path='/searchKeyword/:keyword' />
        <MovieListByType path='/movies/:type' />
        <MovieListByGenre path='/movies/genre/:type/:id' />

        <MovieDetails path='/movies/:id/' currentUser={currentUser} setCurrentUser={setCurrentUser} recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed}>
          <MovieDetailsOverview path='overview' />
          <MovieDetailsVideos path='videos' />
          <MovieDetailsInfo path='info' />
          <MovieDetailsReview path='reviews' currentUser={currentUser} />
          <MapSearchTheaters path='theaters' />
        </MovieDetails>

        <MapSearchTheaters path='/theaters' />
        <Profile path='/profile' currentUser={currentUser} setCurrentUser={setCurrentUser} setCurrentUserId={setCurrentUserId} recentlyViewed={recentlyViewed} />
        <SignUp path='/sign_up' />
        <SignIn path='/sign_in' setCurrentUserId={setCurrentUserId} />
      </Router>
      
      <Chat />
    </div>
  );
}

export default App;
