import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../module.css/MovieDetails.module.css'

const MovidDetailsInfo = (props) => {
    const { id } = props
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [movie, setMovie] = useState({})
    const [countries, setCountries] = useState([])
    const [languages, setLanguages] = useState([])
    const [companies, setCompanies] = useState([])
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])

    useEffect(() => {
        // MOVIE INFO
        axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY+'&language=en-US&append_to_response=credits')
            .then(res => {
                setMovie(res.data)
                setCast(res.data.credits.cast)
                setCrew(res.data.credits.crew)
                setCountries(res.data.production_countries)
                setLanguages(res.data.spoken_languages)
                setCompanies(res.data.production_companies)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container-sm px-5 pt-3 pb-5">
            <h2>Details</h2>
            <div className="px-5 mt-3">
                <p><strong>Official site: </strong>{movie.homepage}</p>
                <p>
                    <strong>Country: </strong>
                    {countries.map((country, i) => {
                        if(i === 0) {
                            return <span key={i}>{country.name}</span>
                        } else {
                            return <span key={i}>, {country.name}</span>
                        }
                    })}
                </p>
                <p>
                    <strong>Language: </strong>
                    {languages.map((language, i) => {
                        if(i === 0) {
                            return <span key={i}>{language.name}</span>
                        } else {
                            return <span key={i}>, {language.name}</span>
                        }
                    })}
                </p>
                <p><strong>Original title: </strong>{movie.original_title}</p>
                <p>
                    <strong>Production companies: </strong>
                    {companies.map((company, i) => {
                        if(i === 0) {
                            return (
                                <span key={i}>
                                    {company.logo_path!==null && <img src={"http://image.tmdb.org/t/p/w92/"+ company.logo_path} className={styles.companyLogo}/>}
                                    {company.name}
                                </span>
                            )
                        } else {
                            return (
                                <span key={i}> 
                                    , {company.logo_path!==null && <img src={"http://image.tmdb.org/t/p/w92/"+ company.logo_path} className={styles.companyLogo}/>}
                                    {company.name}
                                </span>
                            )
                        }
                    })}
                </p>
                <p><strong>Budget: </strong>$ {movie.budget}</p>
                <p><strong>Revenue: </strong>$ {movie.revenue}</p>
            </div>
            <p data-toggle="collapse" data-target="#collapseCast" aria-expanded="false" aria-controls="collapseCast"><span className="h2 mr-2">Cast</span>click here to expand</p>
            <div class="collapse" id="collapseCast">
                <div class="card card-body mb-3">
                    <table>
                        <tbody>
                            {cast.map((c, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="pr-3"><strong>{c.name}</strong></td>
                                        <td className="pr-5">as</td>
                                        <td><strong>{c.character}</strong></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <p data-toggle="collapse" data-target="#collapseCrew" aria-expanded="false" aria-controls="collapseCrew"><span className="h2 mr-2">Crew</span>click here to expand</p>
            <div class="collapse" id="collapseCrew">
                <div class="card card-body">
                    <table>
                        <tbody>
                            {crew.map((c, i) => {
                                return (
                                    <tr>
                                        <td className="pr-3"><strong>{c.name}</strong></td>
                                        <td className="pr-3">{c.job}</td>
                                        <td>{c.department}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default MovidDetailsInfo