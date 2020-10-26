import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileList from './ProfileList';

import { Container, Row, Col } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';

const Profile = (props) => {
    const { currentUser, setCurrentUser, setCurrentUserId, recentlyViewed } = props;
    const [fav, setFav] = useState([]);
    const [watch, setWatch] = useState([]);
    const [reviews] = useState([]);

    useEffect(() => {
        if(currentUser === null) {
            alert("Please login to access profile.")
            navigate('/');
        } else {
            setFav(currentUser.favorites);
            setWatch(currentUser.watchlist);
        }
    }, [])
    
    const ClickPoster = (e) => {
        navigate('/movies/' + e.target.id + '/overview')
    }
    
    const DeleteAccount = (e) => {
        const deleteAccount = window.confirm("Do you want to delete your account?")
        if(deleteAccount) {
            axios.delete('http://localhost:8000/users/' + currentUser._id)
            .then(res => {
                navigate('/');
                setCurrentUser(null);
                setCurrentUserId("");
            })
            .catch(err => console.log(err))
        }
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
                        {recentlyViewed.length === 0 && <p>No recently viewed movie.</p>}
                        {recentlyViewed.map((item, i) => {
                            return (
                            (i <= 12) && 
                                <img key={i} alt={item.title} onClick={ClickPoster} src={"http://image.tmdb.org/t/p/w92/"+ item.poster_path} id={item.id} className="mr-3 mb-3" />
                            )
}                       )}
                    </div>
                    <h3>My Favorites</h3>
                    <ProfileList listState={fav} setListState={setFav} currentUser={currentUser} type="favorites" />

                    <h3>My Watchlist</h3>
                    <ProfileList listState={watch} setListState={setWatch} currentUser={currentUser} type="watch list" />

                    <h3>My Reviews</h3>
                    <div className="mb-5">
                        {reviews.length === 0 && <Link to='/searchmovies'>Write a reivew.</Link>}
                    </div>
                </Col>
                <Col sm={4}>
                    <h4>My Friend List</h4>
                    <div>
                        coming soon..
                    </div>
                </Col>
            </Row>
            <input type="button" onClick={DeleteAccount} value="Delete My Account" className="btn btn-danger mb-5" />
        </Container>
    )
}
export default Profile