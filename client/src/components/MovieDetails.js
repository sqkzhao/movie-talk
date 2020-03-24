import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppBar, Tabs, Tab, CircularProgress } from '@material-ui/core'
import styles from '../module.css/MovieDetails.module.css'
import MovieDetailsOverview from './MovieDetailsOverview'

const MovieDetails = (props) => {
    const { id } = props
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])
    const [runtime, setRuntime] = useState('')
    const [year, setYear] = useState(0)

    useEffect(() => {
        // MOVIE INFO
        axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY+'&language=en-US')
            .then(res => {
                setMovie(res.data)
                setGenres(res.data.genres)
                const hr = Math.floor(res.data.runtime/60)
                const min = res.data.runtime%60
                setRuntime(`${hr}h ${min}min`)
                setYear(res.data.release_date.slice(0, 4))
                props.state = {
                    name: "hello"
                }
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <div className="col" id={styles.bgContainer}>
                {/* BACKGROUND */}
                <img src={"http://image.tmdb.org/t/p/w342/"+ movie.backdrop_path} id={styles.background} />
                <div>
                    {/* MAIN SECTION */}
                    <div className="container-md mt-5" id={styles.infoContainer}>
                        <div className="row">
                            {/* POSTER */}
                            <img src={"http://image.tmdb.org/t/p/w342/"+ movie.poster_path} className="image-fluid mx-4" id={styles.poster}/>
                            {/* MOVIE INFO */}
                            <div className="col ml-3" id={styles.infoBox}>
                                <h1>{movie.title} ({year})</h1>
                                {/* GENRES */}
                                <p>
                                    {genres.map((genre, i) => (
                                        <span className="badge badge-info mr-2">{genre.name}</span>
                                    ))}
                                </p>
                                <p>{runtime} | In Theaters {movie.release_date}</p>
                                <p>
                                    <CircularProgress variant="static" value={movie.vote_average*10}/>
                                    {movie.vote_average}/10 ({movie.vote_count} votes)
                                </p>
                                <p>
                                    Popularity {movie.popularity}
                                    <i className="fab fa-hotjar ml-1"></i>
                                    <i className="fab fa-hotjar ml-1"></i>
                                    <i className="fab fa-hotjar ml-1"></i> 
                                </p>
                                {/* BUTTONS */}
                                <button className={styles.iconStyle}><i class="far fa-grin-hearts" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"></i></button>
                                <button className={styles.iconStyle}><i class="far fa-list-alt"></i></button>
                                <button className={styles.iconStyle}><i class="fas fa-map-marked-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* MOVIE DETAILS NAVIGATION */}
            <div> 
                <AppBar position="static">
                    <Tabs variant="fullWidth" className="container-md">
                        <Tab label="Overview" />
                        <Tab label="Videos" />
                        <Tab label="Movie Info" />
                        <Tab label="Reviews" />
                        <Tab label="Comments" />
                    </Tabs>
                </AppBar>
            </div>
            {/* MOVIE DETAILS COMPONENTS */}
            <div className="container-md bg-white text-dark">
                {props.children}
            </div>
        </div>
    )
}
export default MovieDetails