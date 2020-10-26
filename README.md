# MOVIE TALK 🍿🎥🍿
https://movie-talk-deploy.vercel.app/ (Front-end only)

#### Explore and discover millions of movies.
- **API** built with Node, Express, MangoDB, React, Socket.io and JWT Auth
- **WebApp** built with React.js
- Written in ES6+ using Babel + Webpack

## Setup and Running
- Setup
  - Server: Install packages and database setup `cd movie/server` and:
    -  `npm init -y`
    -  `npm i express mongoose cors socket.io bcrypt jsonwebtoken`
  - Webapp: Install packages `cd movie/client` and:
    -  `npm i axios @reach/router socket.io-client`
    -  `npm i react-bootstrap bootstrap @material-ui/core`
    -  `npm i --save react-google-maps react-places-autocomplete`
- Development
  - Run Database `cd movie/server` and `npm start`, browse database at http://localhost:8000/
  - Run Webapp `cd movie/client` and `npm start`, browse webapp at http://localhost:3000/

## Resources 
The Movie Database API https://developers.themoviedb.org/3/getting-started/introduction


