import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchMoviePage from './SearchMoviePage'


const SearchMovieResult = (props) => {
    const { keyword } = props
    const [result, setResult] = useState([])
    const [key, setKey] = useState("")

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/keyword/${keyword}/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false`)
            .then(res => {
                setResult(res.data.results)
            })
            .catch(err => console.log(err));
        
        axios.get(`https://api.themoviedb.org/3/keyword/${keyword}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                setKey(res.name);
            })
            .catch(err => console.log(err));
    }, [keyword])

    return(
        <SearchMoviePage category={result} type={"Search result: " + key} />
    )
}
export default SearchMovieResult

