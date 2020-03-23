import React from 'react';
import { Router } from '@reach/router'
import Home from './components/Home'
import SearchTheaters from './components/SearchTheaters';

function App() {
  return (
    <div>
      <Router>
        <Home path='/' />
        <SearchTheaters path='/theaters' />
      </Router>
    </div>
  );
}

export default App;
