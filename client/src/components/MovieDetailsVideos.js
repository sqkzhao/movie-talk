import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Backdrop } from '@material-ui/core'

const MovieDetailsVideos = (props) => {
    const { id } = props
    const [trailers, setTrailers] = useState([])

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key='+`${process.env.REACT_APP_API_KEY}`+'&language=en-US')
            .then(res => {
                setTrailers(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div className="container-sm px-5 pt-3 pb-5">

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