import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetailsSimilar from './MovieDetailsSimilar';

import { Link } from '@reach/router';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from '../module.css/MovieDetails.module.css';

const MovieDetailsOverview = (props) => {
    const { id } = props
    const [movie, setMovie] = useState({})
    const [trailers, setTrailers] = useState([])
    const [cast, setCast] = useState([])
    const [director, setDirector] = useState({})

    useEffect(() => {
        // MOVIE INFO
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=credits`)
            .then(res => {
                setMovie(res.data)
                setCast(res.data.credits.cast)
                setDirector(res.data.credits.crew[0])
            })
            .catch(err => console.log(err))
        // MOVIE TRAILERS
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(res => {
                setTrailers(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])

    const renderTooltip = (props) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                More videos
            </Tooltip>
        )
    }

    return (
        <div>
            <div className="container-sm px-5 pt-3">

                {/* OVERVIEW */}
                <h3>Overview</h3>
                <p className="px-5">{movie.tagline}</p>
                <p className="px-5">{movie.overview}</p>
                {/* HASHTAG */}

                {/* CAST AND CREW */}
                <h3 className="mt-3">Cast and Crew</h3>
                <div className="row mt-3 px-5 pb-4 text-center">
                    {director ?
                    <div className={styles.castBox}>
                        <img src={`http://image.tmdb.org/t/p/w185/${director.profile_path}`} className={styles.cast} alt={director.name}/><br/>
                        <span className={styles.castName}>{director.name}</span><br/>
                        <strong className={styles.castName}>Director</strong>
                    </div> : null}
                    {cast.map((actor, i) => {
                        return (
                            (i < 5) &&
                            <div key={i} className={styles.castBox}>
                                <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} className={styles.cast} alt={actor.name}/><br/>
                                <span className={styles.castName}>{actor.name}</span><br/>
                                <strong className={styles.castName}>{actor.character}</strong>
                            </div>
                        )
                    })}
                </div>

                {/* TRAILER */}
                <div className="row my-5">
                    <h3 className="col-11">The Latest Trailer</h3>
                    <div className="text-right float-right col-1">
                        <OverlayTrigger placement="right" delay={{ show: 200, hide: 500 }} overlay={renderTooltip}>
                            <Link to='../videos'><i className="fas fa-arrow-circle-right text-warning" id={styles.iconStyle}></i></Link>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className="row justify-content-center my-3 pb-3">
                    <div className="col text-center videoContainer">
                    {trailers.map((trailer, i) => {
                        return(
                            (i === 0) &&
                            <iframe key={i} className="iframeResponsive" width="616" height="347" src={"https://www.youtube.com/embed/"+trailer.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={trailer.key}></iframe>
                        )
                    })} 
                    </div>
                </div>
            </div>
            <MovieDetailsSimilar movieid={id} />
        </div>
    )
}
export default MovieDetailsOverview