import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link,Router} from '@reach/router';
import Carousel from 'react-bootstrap/Carousel';
import { GridList, GridListTile } from '@material-ui/core'
import styles from '../module.css/Chat.module.css'


const Home = (props) => {
    const [upcoming, setUpcoming] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const [popular, setPopular] = useState([])
    const [genre, setGenre] = useState([])

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' +`${process.env.REACT_APP_API_KEY}`+ '&language=en-US&page=1')
            .then(res => {
                setUpcoming(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' +`${process.env.REACT_APP_API_KEY}`+ '&language=en-US&page=1')
            .then(res => {
                setNowPlaying(res.data.results)
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' +`${process.env.REACT_APP_API_KEY}`+ '&language=en-US&page=1')
            .then(res => {
            setPopular(res.data.results)
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' +`${process.env.REACT_APP_API_KEY}`+ '&language=en-US')
            .then(res => {
                setGenre(res.data.genres)
            })
    }, [])

    return(
        <div className="pb-5">
            {/* Poster Display for upcoming movies */}
            <div style={{width:'75%', margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif', padding:'0rem 0rem 5rem 0rem'}}>
                <h1 className="mt-5">Upcoming</h1>
                <Carousel>
                    {upcoming.map((movie,i) =>(
                        <Carousel.Item key={i}>
                            <Link to={'/movies/'+ movie.id +'/overview'}>
                                <img
                                className="d-block w-100"
                                src={"http://image.tmdb.org/t/p/original" + movie.backdrop_path}
                                alt=""/>
                            </Link>
                            <Carousel.Caption>
                                <h1 style={{color: 'rgba(255, 255, 255)', fontFamily:'Impact, Charcoal, sans-serif', fontSize:'5rem', textShadow: '2px 2px rgba(0, 0, 0, 0.5)'}}>
                                    {movie.title}
                                </h1>               
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div style={{ width:'60%', margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                <h1>Now Playing</h1>
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
                                    <h1 style={{color: 'rgba(255, 255, 255)', fontFamily:'Impact, Charcoal, sans-serif', fontSize:'5rem', textShadow: '2px 2px rgba(0, 0, 0, 0.5)'}}>
                                        {movie.title}
                                    </h1>       
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <h2 className="text-center pt-5 mt-3" style={{fontFamily:'Impact, Charcoal, sans-serif'}}>Popular Movies</h2>
            <div className="row justify-content-center pb-5">
                <GridList cellHeight={280} className={styles.gridList} cols={5} >
                    {popular.map((item, i) => (
                        <GridListTile key={i}>
                            <Link to={"/movies/"+item.id+"/overview"}><img src={"http://image.tmdb.org/t/p/w185" + item.poster_path} alt={item.title}/></Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            
{/*        
            {genre.map((genre,i) =>(
                <div>
                    <p>{genre.name}</p>
                </div>   
            ))} */}
            

  
        </div>
    )
}
export default Home


