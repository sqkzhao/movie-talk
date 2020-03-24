import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';
import MovieDetailsOverview from './components/MovieDetailsOverview';

function App() {
  return (
    <div className="bg-dark text-white">
      <Router>
        <Home path='/' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id/'>
          <MovieDetailsOverview path='overview' />
        </MovieDetails>
      </Router>
    </div>
  );
}

export default App;
