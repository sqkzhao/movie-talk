import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import styles from '../module.css/Profile.module.css';

const ProfileList = (props) => {
    const { listState, setListState, currentUser, type } = props;

    const ClickPoster = (e) => {
        navigate('/movies/' + e.target.id + '/overview')
    }

    const RemoveFavorite = (e, movieId) => {
        const temp = listState.filter(movie => movie.movieid !== movieId)
        setListState(temp);
        if(type === "favorites") {
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                favorites: temp
            })
                .then(res => {
                })
                .catch(err => console.log(err))
        } else {
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                watchlist: temp
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }
    
    return (
        <div className="mb-3">
            {listState.length <= 0 && <p>You haven't added any movies in your {type}.</p>}
            {listState.length > 0 && 
                listState.map((item, i) => {
                    if(i <= 12) {
                        return (
                            <div style={{position: 'relative', display: 'inline-block'}}>
                                <img key={i} onClick={ClickPoster} src={"http://image.tmdb.org/t/p/w92/"+ item.url} id={item.id} className="mr-3 mb-3" />
                                <i className="fas fa-times" onClick={e => RemoveFavorite(e, item.movieid)} id={styles.closeIcon}></i>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
export default ProfileList;