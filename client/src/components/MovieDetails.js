import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import MovieDetailsSimilar from './MovieDetailsSimilar';

import { ProgressBar, Tooltip, OverlayTrigger, Toast } from 'react-bootstrap';
import { AppBar, Button } from '@material-ui/core';
import styles from '../module.css/MovieDetails.module.css';

const MovieDetails = (props) => {
    const { id, currentUser, setCurrentUser, recentlyViewed, setRecentlyViewed } = props;
    const [movie, setMovie] = useState({});
    const [genres, setGenres] = useState([]);
    const [hashtag, setHashtag] = useState([]);
    const [runtime, setRuntime] = useState('');
    const [year, setYear] = useState(0);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(true);
    
    useEffect(() => {
        // MOVIE INFO
        axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+`${process.env.REACT_APP_API_KEY}`+'&language=en-US')
            .then(res => {
                setMovie(res.data)
                setGenres(res.data.genres)
                const hr = Math.floor(res.data.runtime/60)
                const min = res.data.runtime%60
                setRuntime(`${hr}h ${min}min`)
                setYear(res.data.release_date.slice(0, 4))
                // add the movie to the recently viewed list
                let isDup = false;
                for(let x of recentlyViewed) {
                    if(x.id == res.data.id) {
                        isDup = true;
                    }
                }
                if(!isDup) {
                    recentlyViewed.push(res.data)
                    setRecentlyViewed(recentlyViewed)
                }
            })
            .catch(err => console.log(err))
            
        // HASHTAG/KEYWORDS
        axios.get('https://api.themoviedb.org/3/movie/'+id+'/keywords?api_key='+`${process.env.REACT_APP_API_KEY}`+'&language=en-US&append_to_response=credits')
            .then(res => {
                setHashtag(res.data.keywords)
            })
            .catch(err => console.log(err))
    }, [])

    const AddFavorites = (e) => {
        e.preventDefault()
        if(currentUser === null) {
            alert("Please login to add favorites.")
            navigate('/sign_in')
        } else {
            let fav = currentUser.favorites;
            let isDup = false;
            for(let x of fav) {
                console.log(x.movieid, "...", movie.id)

                if(x.movieid == movie.id) {
                    isDup = true;
                }
            }
            if(!isDup) {
                fav.push({movieid: movie.id, url: movie.poster_path});
                console.log(fav)
                setNotification("Added to your favorites")
            } else {
                setNotification("Already in your favorites")
            }
            // add movie to favorite list
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                favorites: fav
            })
                .then(res => {
                    console.log(res.data)
                    setCurrentUser(res.data)
                })
                .catch(err => console.log(err))
            setShow(true)
        }
    }

    const AddToWatchlist = (e) => {
        e.preventDefault()
        if(currentUser == null) {
            alert("Please login to add watchlist.")
            navigate('/sign_in')
        } else {
            const watch = currentUser.watchlist;
            let isDup = false;
            if(watch.length !== 0) {
                for(let x of watch) {
                    if(x.movieid == movie.id) {
                        isDup = true;
                    }
                }
            }
            if(!isDup) {
                watch.push({movieid: movie.id, url: movie.poster_path});
                setNotification("Added to your watchlist.")
            } else {
                setNotification("Already in your watchlist.")
            }
            // add movie to favorite list
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                watchlist: watch
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            setShow(true)
        }
    }

    const searchKeyword = (keyword) => {
        navigate('/searchKeyword/' + keyword)
    }

    return (
        <div className="bg-warning text-white">
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
                                        <span key={i} className="badge badge-warning mr-2">{genre.name}</span>
                                    ))}
                                </p>
                                <p>{runtime} | In Theaters {movie.release_date}</p>
                                <div className="pr-5 mr-5">
                                    <span className="h3 font-weight-bold text-warning">{movie.vote_average}</span><strong> /10 ({movie.vote_count} votes)</strong>
                                    <ProgressBar animated striped variant="warning" now={movie.vote_average*10} label={`Scored ${movie.vote_average} out of ${movie.vote_count} votes`}/>
                                </div>
                                <p>
                                    <strong>Popularity </strong>{movie.popularity}
                                    <i className="fab fa-hotjar ml-1 text-warning"></i>
                                    <i className="fab fa-hotjar ml-1 text-warning"></i>
                                    <i className="fab fa-hotjar ml-1 text-warning"></i> 
                                </p>
                                {/* ICONS */}
                                <div className="mt-3 mb-4">
                                    {/* FAVORITES */}
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}>
                                            <div className={styles.tooltip}>Add to Favorites</div>
                                        </Tooltip>
                                    }>
                                        <i 
                                            onClick = {AddFavorites}
                                            className="far fa-grin-hearts" 
                                            data-toggle="tooltip" data-placement="bottom"
                                            id={styles.iconStyle}
                                        ></i>
                                    </OverlayTrigger>

                                    {/* WATCHLIST */}
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}>
                                            <div className={styles.tooltip}>Add to Watchlist</div>
                                        </Tooltip>
                                    }>
                                        <i 
                                            onClick = {AddToWatchlist}
                                            className="far fa-list-alt" 
                                            data-toggle="tooltip" data-placement="bottom" 
                                            id={styles.iconStyle}
                                        ></i>
                                    </OverlayTrigger>

                                    {/* THEATER */}
                                    <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 400 }} overlay={
                                        <Tooltip id={`tooltip-favorites`}>
                                            <div className={styles.tooltip}>Find Nearby Theater</div>
                                        </Tooltip>
                                    }>
                                        <Link to='./theaters'>
                                            <i className="fas fa-map-marked-alt" data-toggle="tooltip" data-placement="bottom" id={styles.iconStyle}></i>
                                        </Link>
                                    </OverlayTrigger>
                                </div>
                                {/* HASHTAG/KEYWORDS */}
                                <div>
                                    {hashtag.map((keyword, i) => {
                                        if(i < 9) {
                                            return <button key={i} onClick={e => searchKeyword(keyword.id)} type="button" className="btn btn-sm btn-outline-info mr-2 mb-2">#{keyword.name}</button>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* NOTIFICATION */}
                <Toast show={show} onClose={() => setShow(false)} delay={2000} autohide style={{ position: 'absolute', top: '5px', right: '5px', color: '#000' }}>
                    <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="pr-5">Notification</strong>
                    <small>just now</small>
                    </Toast.Header>
                    <Toast.Body className="pl-3">{notification}</Toast.Body>
                </Toast>
            </div>
            {/* MOVIE DETAILS NAVIGATION */}
            <div> 
                <AppBar position="static">
                    <div className="mx-auto container-md">
                        <div className="row">
                            <Button onClick={(e) => navigate(`/movies/${id}/overview`)} className="py-3 text-light mx-auto col">Overview</Button>
                            <Button onClick={(e) => navigate(`/movies/${id}/info`)} className="py-3 text-light mx-auto col">Details</Button>
                            <Button onClick={(e) => navigate(`/movies/${id}/videos`)} className="py-3 text-light mx-auto col">Videos</Button>
                            <Button onClick={(e) => navigate(`/movies/${id}/reviews`)} className="py-3 text-light mx-auto col">Reviews</Button>
                            <Button onClick={(e) => navigate(`/movies/${id}/theaters`)} className="py-3 text-light mx-auto col">Nearby Theaters</Button>
                        </div>              
                    </div>
                </AppBar>
            </div>
            {/* MOVIE DETAILS COMPONENTS */}
            <div className="container-md bg-white text-dark">
                {props.children}
                <MovieDetailsSimilar movieid={id} />
            </div>
        </div>
    )
}
export default MovieDetails