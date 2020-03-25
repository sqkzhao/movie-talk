import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppBar, Tabs, Tab, a11yProps } from '@material-ui/core'
import styles from '../module.css/MovieDetails.module.css'

const MovieDetails = (props) => {
    const { id } = props
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [movie, setMovie] = useState({})
    const [trailers, setTrailers] = useState([])
    const [cast, setCast] = useState([])

    useEffect(() => {
        // MOVIE INFO
        axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY+'&language=en-US&append_to_response=credits')
            .then(res => {
                setMovie(res.data)
                setCast(res.data.credits.cast)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        // MOVIE TRAILERS
        axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key='+API_KEY+'&language=en-US')
            .then(res => {
                setTrailers(res.data.results)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div className="container-lg">
            <div className="col" id={styles.bgContainer}>
                <img src={"http://image.tmdb.org/t/p/w342/"+ movie.backdrop_path} id={styles.background} />
                <div className="col m-5" id={styles.infoContainer}>
                    <img src={"http://image.tmdb.org/t/p/w342/"+ movie.poster_path} id={styles.poster}/>
                    <div className="col-6"id={styles.infoBox}>
                        <h1>{movie.title}</h1>
                        <p>{movie.runtime} Minutes</p>
                    </div>
                </div>
            </div>
            <div>
                <AppBar position="static">
                    <Tabs>
                        <Tab label="Overview" />
                        <Tab label="Videos" />
                        <Tab label="Cast & Crew" />
                        <Tab label="Reviews" />
                        <Tab label="Comments" />
                    </Tabs>
                </AppBar>
            </div>
            <h2>Overview</h2>
            <p>{movie.overview}</p>

            {/* <div>
                {trailers.map((trailer, i) => {
                    if(i == 0) {
                        return <iframe key={i} width="560" height="315" src={"https://www.youtube.com/embed/"+trailer.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    }
                })}
            </div> */}





            {/* TRAILERS */}
            {trailers.map((trailer, i) => (
                <iframe key={i} width="560" height="315" src={"https://www.youtube.com/embed/"+trailer.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            ))}

            {/* <div>
                {cast.map((actor, i) => {
                    if(i < 6) {
                        return (
                            <div key={i}>
                                <img src={"http://image.tmdb.org/t/p/w92/"+ actor.profile_path} />
                                {actor.name}
                            </div>
                        )
                    }
                })}
            </div> */}
        </div>
    )
}
export default MovieDetails