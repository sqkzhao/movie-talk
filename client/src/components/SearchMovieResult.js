import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchMovieSection from './SearchMovieSection'

const SearchMovieResult = (props) => {
    const { keyword } = props
    const [result, setResult] = useState([])
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=en-US&query=' + keyword + '&page=1&include_adult=false')
            .then(res => {
                setResult(res.data.results)
                console.log(res.data.results)
            })
            .catch(err => console.log(err))
        
    }, [keyword])

    return(
        <SearchMovieSection category={result} type={"Search result: " + keyword} num={10} />
    )
}
export default SearchMovieResult

