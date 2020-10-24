import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SearchMoviePage from './SearchMoviePage';
import PageNavigation from './PageNavigation';

const SearchMovieResult = (props) => {
    const { keyword } = props
    const [result, setResult] = useState([])
    const [pages, setPages] = useState(0);
    const [goToPage, setGoToPage] = useState(1);

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + `${process.env.REACT_APP_API_KEY}` + '&language=en-US&query=' + keyword + '&page=' + goToPage + '&include_adult=false')
            .then(res => {
                setResult(res.data.results);
                setPages(res.data.total_pages);
            })
            .catch(err => console.log(err))
    }, [keyword, goToPage])

    return(
        <div>
            <SearchMoviePage category={result} type={"Search result: " + keyword} />
            {pages > 1 ? <PageNavigation pages={pages} goToPage={goToPage} setGoToPage={setGoToPage} /> : null}
        </div>
    )
}
export default SearchMovieResult

