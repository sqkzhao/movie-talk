import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import SearchTheaters from './components/SearchTheaters';

function App() {
  return (
    <div>
      <Router>
        <Home path='/' />
        <SearchTheaters path='/theaters' />
        <MovieDetails path='/movies/:id' />
      </Router>
    </div>
  );
}

export default App;
