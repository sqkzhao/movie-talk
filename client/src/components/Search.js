// MOVIE SECTIONS
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchMovieSection from './SearchMovieSection'

const Search = () => {
    const [popular, setPopular] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
            .then(res => {
                setPopular(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
            .then(res => {
                setUpcoming(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
            .then(res => {
                setTopRated(res.data.results)   
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div>
            {/* MOVE CODES INTO SEPERATE FILE */}
            {/* SEE SearchMovieSection.js */}
            <SearchMovieSection category={popular} type="Popular Movie" num={2} id="popular" />
            <hr className="half-rule"/>

            <SearchMovieSection category={upcoming} type="Upcoming Movie" num={2} id="upcoming" />
            <hr className="half-rule" style={{height:'10px'}}/>

            <SearchMovieSection category={topRated} type="Top Rated Movie" num={2} id="top_rated" />
        </div>
    )
}
export default Search


