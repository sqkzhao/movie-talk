import React, { useState } from 'react'
import { Link } from '@reach/router'
import CollapseButton from './CollapseButton'

import Collapse from 'react-bootstrap/Collapse'

const SearchMovieSection = (props) => {
    const { type, category, num, id } = props
    const [open, setOpen] = useState(false);

    const stringReducer = (string) => {
        if(string.length <= 350) {
            return string
        } else {
            const last_space_index = string.substring(0, 350).lastIndexOf(" ")
            return string.slice(0, last_space_index);
        }
    }

    return(
        <section className="my-5">
            <div style={{margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                <Link to={'/movies/'+id} className="text-dark"><h1 className="mb-4">{type}</h1></Link>
                <div id="example-collapse-text">
                    {category.slice(0,num).map((movie,i) => movie.poster_path != null && (
                        
                        <div key={i} style={{display:'inline-block'}}>
                            <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                <Link to={'/movies/'+movie.id+'/overview'}>
                                    <img
                                    className="d-block w-100"
                                    src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                    alt=""/>
                                </Link>
                            </div>
                            <div style={{width:'250px', margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                <h1 className="pt-3">
                                    <svg className="bi bi-star-fill" width="1em" height="0.9em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <span className="pl-2 h3">{movie.vote_average}</span>
                                </h1>
                            
                                <h4 style={{width:'250px', color: 'rgba(0, 0, 0, 0.6)'}}>
                                    <Link to={'/movies/'+movie.id+'/overview'} style={{color: "#000"}}>
                                        {movie.title} 
                                    </Link>
                                    <span style={{fontSize:'1rem'}}>({movie.release_date.slice(0,4)})</span>
                                </h4>
                                <h4></h4>
                                <h6 style={{width:'250px'}}>Released: {movie.release_date}</h6>
                                <hr className="half-rule"/>
                                <p style={{width: '250px', fontWeight:'lighter', fontSize:'15px', fontFamily:'system-ui', textAlign:'left', lineHeight:'1.5'}}>
                                    <strong style={{color:'black', border:'solid black 1px', padding: '3px', marginRight:'5px'}}>Overview</strong>
                                    {stringReducer(movie.overview)} <Link to={'/movies/'+movie.id+'/overview'}>More..</Link> 
                                </p>
                            </div>                           
                        </div>

                    ))}
                </div>

                <Collapse in={open}>    
                <div id="example-collapse-text">
                    {category.slice(num).map((movie,i) =>{
                        if(movie.poster_path !== null){
                            return(
                                <div key={i} style={{display:'inline-block'}}>
                                    <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                        <Link to={'/movies/'+movie.id+'/overview'}>
                                            <img
                                            className="d-block w-100"
                                            src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                            alt=""/>
                                        </Link>
                                    </div>
                                    <div style={{width:'250px', margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                        <h1 className="pt-3">
                                            <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <span className="pl-2">{movie.vote_average}</span>
                                        </h1>
                                    
                                        <h4 style={{width:'250px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title} <span style={{fontSize:'1rem'}}>({movie.release_date.slice(0,4)})</span></h4>
                                        <h4></h4>
                                        <h6 style={{width:'250px'}}>Released: {movie.release_date}</h6>
                                        <hr className="half-rule"/>
                                        <p style={{width: '250px', fontWeight:'lighter', fontSize:'15px', fontFamily:'system-ui', textAlign:'left', lineHeight:'1.5'}}>
                                            <strong style={{color:'black', border:'solid black 1px', padding: '3px', marginRight:'5px'}}>Overview</strong>
                                            {stringReducer(movie.overview)} <Link to={'/movies/'+movie.id+'/overview'}>More..</Link> 
                                        </p>
                                    </div>                           
                                </div>
                            )
                        }
                    })}
                </div>
                </Collapse>

                <CollapseButton open={open} setOpen={setOpen} />
            </div>
        </section>
    )
}
export default SearchMovieSection