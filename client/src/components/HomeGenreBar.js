import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

import Chip from '@material-ui/core/Chip';

const HomeGenreBar = () => {
    const [genereList, setGenereList] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(res => {
                setGenereList(res.data.genres);
            })
            .catch(err => console.log.err);
    }, [])

    return (
        <div className="bg-dark jumbotron jumbotron-fluid mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-4 text-light">
                        <h1 className="display-5">EXPLORE!! <i className="far fa-play-circle text-warning"></i></h1>
                        <h4 className="display-4 float-right">movies</h4>
                        <h1 className="display-4">GENERES</h1>
                    </div>
                    <div className="lead col-7 border-left border-warning ml-5 pl-5 my-auto">
                        {genereList.map((genre, i) => {
                            return(
                                <Chip
                                    key={i}
                                    size="medium"
                                    icon={<i className="far fa-laugh-wink pl-1 h3"></i>}
                                    label={genre.name}
                                    color="primary"
                                    onClick={(e) => {
                                        navigate('/movies/genre/' + genre.name + '/' + genre.id);
                                    }}
                                    clickable
                                    className="mb-3 mr-2"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeGenreBar;