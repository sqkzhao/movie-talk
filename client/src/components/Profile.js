import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import styles from '../module.css/Profile.module.css'

const Profile = (props) => {
    const { currentUser, setCurrentUser, recentlyViewed } = props
    const [fav, setFav] = useState(currentUser.favorites)
    const [watch, setWatch] = useState(currentUser.watchlist)
    const [reviews, setReviews] = useState(currentUser.reviews)

    const ClickPoster = (e) => {
        navigate('/movies/' + e.target.id + '/overview')
    }
    
    const DeleteAccount = (e) => {
        axios.delete('http://localhost:8000/users/' + currentUser._id)
            .then(res => {
                alert("Account deleted!")
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    //////////////////WORKING ON THIS EARLIER - cannot update fav/setFav
    const RemoveFavorite = (e, movieId) => {
        const temp = fav.filter(movie => movie.id !== movieId)
        setFav(prev => { 
            return temp
        })
        axios.put('http://localhost:8000/users/' + currentUser._id, {
            ...currentUser,
            favorites: fav
        })
            .then(res => console.log(res.data.favorites))
            .catch(err => console.log(err))
    }

    return (
        <Container className="bg-light py-3 mt-5">
            <Row>
                <Col><h2>Hi! {currentUser != null && currentUser.firstName}</h2></Col>
                <Col><Link to='/' className="float-right">Edit your account info</Link></Col>
            </Row>
            <Row className="mb-5 mt-3">
                <Col>
                    <h3>Recently Viewed</h3>
                    <div className="mb-3">
                        {recentlyViewed.length == 0 && <p>No recently viewed movie.</p>}
                        {recentlyViewed.map((item, i) => {
                            if(i <= 12) {
                                return <img key={i} onClick={ClickPoster} src={"http://image.tmdb.org/t/p/w92/"+ item.poster_path} id={item.id} className="mr-3 mb-3" />
                            }
}                       )}
                    </div>
                    <h3>My Favorites</h3>
                    <div className="mb-3">
                        {fav.length == 0 && <p>You haven't added any favorite movies.</p>}
                        {fav.length > 0 && 
                            fav.map((item, i) => {
                                if(i <= 12) {
                                    return (
                                        <div style={{position: 'relative', display: 'inline-block'}}>
                                            <img key={i} onClick={ClickPoster} src={"http://image.tmdb.org/t/p/w92/"+ item.url} id={item.id} className="mr-3 mb-3" />
                                            <i className="fas fa-times" onClick={e => RemoveFavorite(e, item.id)} id={styles.closeIcon}></i>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <h3>My Watchlist</h3>
                    <div className="mb-3">
                        {watch.length == 0 && <p>You don't have any movie in your watchlist.</p>}
                        {watch.length > 0 && 
                            watch.map((item, i) => {
                                if(i <= 12) {
                                    return <img key={i} onClick={ClickPoster} src={"http://image.tmdb.org/t/p/w92/"+ item.url} id={item.id} className="mr-3 mb-3" />
                                }
                            })
                        }
                    </div>
                    <h3>My Reviews</h3>
                    <div className="mb-5">
                        {reviews.length == 0 && <Link to='/searchmovies'>Write a reivew.</Link>}
                    </div>
                </Col>
                <Col sm={4}>
                    <h4>My Friend List</h4>
                    <div>
                        list of friends...
                    </div>
                </Col>
            </Row>
            <input type="button" onClick={DeleteAccount} value="Delete My Account" className="btn btn-danger mb-5" />
        </Container>
    )
}
export default Profile