import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import MovieDetailsVideos from './components/MovieDetailsVideos';
import MovieDetailsInfo from './components/MovieDetailsInfo';

function App() {
  return (
    <div>
      <Router>
        <Home path='/' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id/'>
          <MovieDetailsOverview path='overview' />
          <MovieDetailsVideos path='videos' />
          <MovieDetailsInfo path='info' />
        </MovieDetails>
      </Router>
    </div>
  );
}

export default App;
