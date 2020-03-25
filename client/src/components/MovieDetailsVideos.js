import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MovieDetailsVideos = (props) => {
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const { id } = props
    const [trailers, setTrailers] = useState([])

    useEffect(() => {
        // MOVIE TRAILERS
        axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key='+API_KEY+'&language=en-US')
            .then(res => {
                setTrailers(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container-sm px-5 pt-3">

            <h2 className="mb-3">Trailers</h2>
            <div className="text-center">
                {trailers.map((trailer, i) => (
                    <span className="ml-2">
                        <iframe key={i} width="450" height="300" src={"https://www.youtube.com/embed/"+trailer.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </span>
                ))}
            </div>
            
        </div>
    )
}
export default MovieDetailsVideos