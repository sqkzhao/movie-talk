import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'
import { ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import styles from '../module.css/MovieDetails.module.css'

const MovieDetails = (props) => {
    const { id } = props
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])
    const [hashtag, setHashtag] = useState([])
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
                console.log(res.data)
            })
            .catch(err => console.log(err))
        // HASHTAG/KEYWORDS
        axios.get('https://api.themoviedb.org/3/movie/'+id+'/keywords?api_key='+API_KEY+'&language=en-US&append_to_response=credits')
            .then(res => {
                setHashtag(res.data.keywords)
            })
            .catch(err => console.log(err))
    }, [])

    return (
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
                            <div className="col ml-3 pr-5" id={styles.infoBox}>
                                <h1>{movie.title} <span className="text-secondary h3">({year})</span></h1>
                                {/* GENRES */}
                                <p>
                                    {genres.map((genre, i) => (
                                        <span className="badge badge-warning mr-2">{genre.name}</span>
                                    ))}
                                </p>
                                <p>{runtime} | In Theaters {movie.release_date}</p>
                                <p className="pr-5 mr-5">
                                    <span className="h3 font-weight-bold text-warning">{movie.vote_average}</span><strong> /10 ({movie.vote_count} votes)</strong>
                                    <ProgressBar animated striped variant="warning" now={movie.vote_average*10} label={`Scored ${movie.vote_average} out of ${movie.vote_count} votes`}/>
                                </p>
                                <p>
                                    <strong>Popularity </strong>{movie.popularity}
                                    <i className="fab fa-hotjar ml-1 text-warning"></i>
                                    <i className="fab fa-hotjar ml-1 text-warning"></i>
                                    <i className="fab fa-hotjar ml-1 text-warning"></i> 
                                </p>
                                {/* BUTTONS */}
                                <div className="my-5">
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}><div className={styles.tooltip}>Add to Favorites</div></Tooltip>
                                    }>
                                        <Link to='/'><i className="far fa-grin-hearts" data-toggle="tooltip" data-placement="bottom" title="Add to Favorite" id={styles.iconStyle}></i></Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}><div className={styles.tooltip}>Add to Watchlist</div></Tooltip>
                                    }>
                                        <Link to='/'><i className="far fa-list-alt" data-toggle="tooltip" data-placement="bottom" title="Add to Favorite" id={styles.iconStyle}></i></Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}><div className={styles.tooltip}>Find Nearby Theater</div></Tooltip>
                                    }>
                                        <Link to='/'><i className="fas fa-map-marked-alt" data-toggle="tooltip" data-placement="bottom" title="Add to Favorite" id={styles.iconStyle}></i></Link>
                                    </OverlayTrigger>
                                </div>
                                {/* HASHTAG/KEYWORDS */}
                                <div>
                                    {hashtag.map((keyword, i) => {
                                        if(i < 9) {
                                            return <button key={i} type="button" class="btn btn-sm btn-outline-info mr-2 mb-2">#{keyword.name}</button>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* MOVIE DETAILS NAVIGATION */}
            <div> 
                <AppBar position="static">
                    <Tabs variant="fullWidth" className="container-md">
                        <Tab label="Overview" onClick={(e) => navigate('/movies/'+id+'/overview')} />
                        <Tab label="Videos" onClick={(e) => navigate('/movies/'+id+'/videos')} />
                        <Tab label="Movie Info" onClick={(e) => navigate('/movies/'+id+'/info')} />
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