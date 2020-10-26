import React from 'react';
import { Link } from '@reach/router';
import HomeGenreBar from './HomeGenreBar';
import About from './About';

import Carousel from 'react-bootstrap/Carousel';
import { GridList, GridListTile } from '@material-ui/core';
import styles from '../module.css/Chat.module.css';

const Home = (props) => {
    const { upcoming, nowPlaying, popular } = props;

    return(
        <div>
            {/* UPCOMING MOVIES */}
            <div style={{width:'1200px', margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif', padding:'0rem 0rem 5rem 0rem'}}>
                {/* <h1 className="mt-5">Upcoming</h1> */}
                <Carousel style={{height: "83vh"}}>
                    {upcoming.map((movie,i) =>(
                        <Carousel.Item key={i} style={{height: "87vh"}}>
                            <Link to={'/movies/'+ movie.id +'/overview'}>
                                <img
                                className="d-block w-100"
                                src={"http://image.tmdb.org/t/p/original" + movie.backdrop_path}
                                alt=""/>
                            </Link>
                            <Carousel.Caption>
                                <h1 style={{color: 'rgba(255, 255, 255)', fontFamily:'Impact, Charcoal, sans-serif', fontSize:'5vw', textShadow: '2px 2px rgba(0, 0, 0, 0.5)'}}>
                                    <Link to={'/movies/'+ movie.id +'/overview'} className="text-light" >
                                        {movie.title}
                                    </Link>
                                </h1>               
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <HomeGenreBar />

            {/* NOW PLAYING      */}
            <div style={{ width:'60%', margin:'0 auto', padding:"0 0 40px 0" ,textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                <h1>Now Playing</h1>
                <hr></hr>
                <Carousel>
                    {nowPlaying.map((movie,i) =>(
                        <Carousel.Item key={i}>
                            <Link to={'/movies/'+ movie.id +'/overview'}>
                                <img
                                className="d-block w-100"
                                src={"http://image.tmdb.org/t/p/w780" + movie.backdrop_path}
                                alt=""/>
                            </Link>
                            <Carousel.Caption>
                                    <h1 style={{color: 'rgba(255, 255, 255)', fontFamily:'Impact, Charcoal, sans-serif', fontSize:'3vw', textShadow: '2px 2px rgba(0, 0, 0, 0.5)'}}>
                                        <Link to={'/movies/'+ movie.id +'/overview'} className="text-light">{movie.title}</Link>
                                    </h1>       
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
                        
            {/* POPULAR MOVIES */}
            <hr className="mt-5"></hr>
            <h2 className="text-center pt-3 mb-5" style={{fontFamily:'Impact, Charcoal, sans-serif'}}>Popular Movies</h2>
            <div className="row justify-content-center pb-5">
                <GridList cellHeight={280} className={styles.gridList} cols={5} >
                    {popular.map((item, i) => (
                        <GridListTile key={i}>
                            <Link to={"/movies/"+item.id+"/overview"}><img src={"http://image.tmdb.org/t/p/w185" + item.poster_path} alt={item.title}/></Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <About />
        </div>
    )
}
export default Home;


