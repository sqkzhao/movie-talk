import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import HomeGenreBar from './HomeGenreBar';
import About from './About';

import Carousel from 'react-bootstrap/Carousel';
import { GridList, GridListTile } from '@material-ui/core';
import styles from '../module.css/Chat.module.css';

const Home = (props) => {
    const { upcoming, nowPlaying, popular } = props;
    const [upcome2, setUpcome2] = useState([])
    const [upcome3, setUpcome3] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2&include_adult=false`)
            .then(res => {
                setUpcome2(res.data.results)   
            })
            .catch(err => console.log(err))
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2&include_adult=false`)
        .then(res => {
            setUpcome3(res.data.results)   
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            {/* UPCOMING MOVIES */}
            <div style={{margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif', padding:'0rem 0rem 0rem 0rem'}}>
                {/* <h1 className="mt-5">Upcoming</h1> */}
                <div className="jumbotron jumbotron-fluid bg-dark p-0 m-0" style={{overflow:'hidden', height:"86vh"}}>
                    <div className="row">
                        <Carousel className="col p-0" style={{overflow:'hidden'}}>
                            {upcoming.map((movie,i) =>(
                                <Carousel.Item key={i}>
                                    <Link to={'/movies/'+ movie.id +'/overview'}>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/original" + movie.poster_path}
                                        style={{height:"87vh"}}
                                        alt=""/>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <Carousel className="col p-0" style={{overflow:'hidden'}}>
                            {upcome2.map((movie,i) =>(
                                <Carousel.Item key={i}>
                                    <Link to={'/movies/'+ movie.id +'/overview'}>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/original" + movie.poster_path}
                                        style={{height:"87vh"}}
                                        alt=""/>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <Carousel className="col p-0" style={{overflow:'hidden'}}>
                            {upcome3.map((movie,i) =>(
                                <Carousel.Item key={i}>
                                    <Link to={'/movies/'+ movie.id +'/overview'}>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/original" + movie.poster_path}
                                        style={{height:"87vh"}}
                                        alt=""/>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        {/* <Carousel className="col-8 p-0">
                            {upcoming.map((movie,i) =>(
                                <Carousel.Item key={i}>
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
                        </Carousel> */}
                    </div>
                </div>
            </div>

            <HomeGenreBar />

            {/* NOW PLAYING      */}
            <div style={{padding:"0 0 40px 0", fontFamily:'Impact, Charcoal, sans-serif'}}>
                <div className="row">
                    <Carousel className="col-8 pt-5 mt-5">
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
                                        <Link to={'/movies/'+ movie.id +'/overview'} className="text-light" style={{textDecoration: 'none'}}>{movie.title}</Link>
                                    </h1>       
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="col-4 incline-block">
                        <div className="bg-dark text-light pt-3 pb-2">
                            <h1>NOW</h1>
                            <h1 className="pl-5">PLAYING</h1>
                        </div>
                    </div>
                </div>
            </div>
                        
            {/* POPULAR MOVIES */}
            <div style={{backgroundColor: 'rgba(96, 96, 96, 0.3)', paddingBottom: '2rem'}}>
                <hr className="mt-5"></hr>
                <h1 className="text-center text-light pt-3 mb-3 mt-5" style={{fontFamily:'Impact, Charcoal, sans-serif'}}>Popular Movies</h1>
                <div className="row justify-content-center pb-5">
                    <GridList cellHeight={280} className={styles.gridList} cols={5} >
                        {popular.map((item, i) => (
                            <GridListTile key={i}>
                                <Link to={"/movies/"+item.id+"/overview"}><img src={"http://image.tmdb.org/t/p/w185" + item.poster_path} alt={item.title}/></Link>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            <About />
        </div>
    )
}
export default Home;


