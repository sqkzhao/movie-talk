import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link,Router} from '@reach/router';
import SearchTheaters from './SearchTheaters'
import Carousel from 'react-bootstrap/Carousel';


const Home = (props) => {
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [upcoming, setUpcoming] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' +API_KEY+ '&language=en-US&page=1')
            .then(res => {
                setUpcoming(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' +API_KEY+ '&language=en-US&page=1')
            .then(res => {
                setNowPlaying(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])



    return(
        <div>
                {/* Poster Display for upcoming movies */}
                <div style={{width:'300px', margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                <h1>Upcoming</h1>

                    <Carousel>
                        {upcoming.map((item,i) =>(
                            <Carousel.Item key={i}>
                                 <Link to='/movies/:id'>
                                    <img
                                    className="d-block w-100"
                                    src={"http://image.tmdb.org/t/p/w780" + item.poster_path}
                                    alt=""/>
                                </Link>
                                <Carousel.Caption>
                                        <h6 style={{color: 'rgba(255, 255, 255, 0.6)', fontFamily:'Impact, Charcoal, sans-serif'}}>
                                            {item.title}
                                        </h6>               
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>


                <div style={{ width:'300px', margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                    <h1>Now Playing</h1>

                    <Carousel>
                        {nowPlaying.map((movie,i) =>(
                            <Carousel.Item key={i}>
                                <Link to='/movies/:id'>
                                    <img
                                    className="d-block w-100"
                                    src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                    alt=""/>
                                </Link>
                                <Carousel.Caption>
                                        <h6 style={{color: 'rgba(255, 255, 255, 0.6)', fontFamily:'Impact, Charcoal, sans-serif'}}>
                                            {movie.title}
                                        </h6>       
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
        
                
            
{/* 
            {upcoming.map((item,i) =>(
                <div  style={{display:'inline-block', border:'1px black solid'}}>
                    <p>{item.title}</p>
                    <img src="https://api.themoviedb.org/3/movie/upcoming?api_key=fe849d6987c0000e3dc1352ccf5118fd&language=en-US&page=1/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg "></img>
                </div>   
            ))}
            
            {nowPlaying.map((item,i) =>(
                <div  style={{display:'inline-block', border:'1px black solid'}}>
                    <p>{item.title}</p>
                    <img src="https://api.themoviedb.org/3/movie/upcoming?api_key=fe849d6987c0000e3dc1352ccf5118fd&language=en-US&page=1/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg "></img>
                </div>   
            ))} */}


        </div>
    )
}
export default Home


