import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'
import { ProgressBar, Tooltip, OverlayTrigger, Toast } from 'react-bootstrap'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import styles from '../module.css/MovieDetails.module.css'

const MovieDetails = (props) => {
    const { id, currentUser, setCurrentUser, recentlyViewed, setRecentlyViewed } = props
    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])
    const [hashtag, setHashtag] = useState([])
    const [runtime, setRuntime] = useState('')
    const [year, setYear] = useState(0)
    const [show, setShow] = useState(false)
    const [notification, setNotification] = useState(true)
    
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
                recentlyViewed.push(res.data)
                setRecentlyViewed(recentlyViewed)
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
        if(currentUser == null) {
            alert("Please login to add favorites.")
            navigate('/sign_in')
        } else {
            currentUser.favorites.push({
                id: movie.id,
                url: movie.poster_path
            })
            // add movie to favorite list
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                favorites: currentUser.favorites
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            setNotification("Added to your favorites")
            setShow(true)
        }
    }

    const AddToWatchlist = (e) => {
        e.preventDefault()
        if(currentUser == null) {
            alert("Please login to add watchlist.")
            navigate('/sign_in')
        } else {
            currentUser.watchlist.push({
                id: movie.id,
                url: movie.poster_path
            })
            // add movie to favorite list
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                watchlist: currentUser.watchlist
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            setNotification("Added to your watchlist.")
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
                                {/* ICONS */}
                                <div className="my-5">
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
                                            return <button key={i} onClick={e => searchKeyword(keyword.id)} type="button" class="btn btn-sm btn-outline-info mr-2 mb-2">#{keyword.name}</button>
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
                    <Tabs variant="fullWidth" className="container-md">
                        <Tab label="Overview" onClick={(e) => navigate('/movies/'+id+'/overview')} />
                        <Tab label="Details" onClick={(e) => navigate('/movies/'+id+'/info')} />
                        <Tab label="Videos" onClick={(e) => navigate('/movies/'+id+'/videos')} />
                        <Tab label="Reviews" onClick={(e) => navigate('/movies/'+id+'/reviews')} />
                        <Tab label="Nearby Theaters" onClick={(e) => navigate('/movies/'+id+'/theaters')} />
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