import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchMovieSection from './SearchMovieSection'

const SearchMovieResult = (props) => {
    const { keyword } = props
    const [result, setResult] = useState([])

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/keyword/' + keyword + '/movies?api_key=' + `${process.env.REACT_APP_API_KEY}` + '&language=en-US&include_adult=false')
            .then(res => {
                setResult(res.data.results)
            })
            .catch(err => console.log(err))
        
    }, [keyword])

    return(
        <SearchMovieSection category={result} type={"Search result: " + keyword} num={10} />
    )
}
export default SearchMovieResult

