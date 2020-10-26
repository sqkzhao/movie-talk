import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import styles from '../module.css/Profile.module.css';

const ProfileList = (props) => {
    const { listState, setListState, currentUser, type } = props;

    const RemoveFavorite = (e, id) => {
        const temp = listState.filter(movie => movie.movieid != id)
        setListState(temp);
        if(type === "favorites") {
            axios.put('http://localhost:8000/users/' + currentUser._id, {
                ...currentUser,
                favorites: temp
            })
                .then(res => console.log(res))
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
                    return (
                    (i <= 12) &&
                        <div style={{position: 'relative', display: 'inline-block'}} key={i}>
                            <img key={i} 
                                src={"http://image.tmdb.org/t/p/w92/"+ item.url} 
                                onClick={(e) => navigate(`/movies/${item.movieid}/overview`)}
                                id={item.movieid} 
                                className="mr-3 mb-3"
                                alt={item.title}
                            />
                            <i className="fas fa-times" 
                                onClick={(e) => RemoveFavorite(e, item.movieid) }id={styles.closeIcon}>
                            </i>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ProfileList;