import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SearchMoviePage from './SearchMoviePage';
import PageNavigation from './PageNavigation';

const SearchMovieResult = (props) => {
    const { id, type } = props
    const [result, setResult] = useState([])
    const [pages, setPages] = useState(0);
    const [goToPage, setGoToPage] = useState(1);
    const typeStr = type.charAt(0).toUpperCase() + type.slice(1)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&page=${goToPage}&include_adult=false`)
            .then(res => {
                setResult(res.data.results)
                // setResult(res.data.results.sort(
                //     function(a, b){
                //         return  b.id - a.id;
                //     }
                // ));
                setPages(res.data.total_pages);
            })
            .catch(err => console.log(err))
    }, [id, goToPage])

    return(
        <div>
            <SearchMoviePage category={result} type={typeStr + " Movies"} />
            {pages > 1 ? <PageNavigation pages={pages} goToPage={goToPage} setGoToPage={setGoToPage} /> : null}
        </div>
    )
}
export default SearchMovieResult

