import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link,Router} from '@reach/router';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';


const Search = (props) => {
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const [popular, setPopular] = useState([])
    const [open, setOpen] = useState(false);
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const stringReducer = (string) => {
        if(string.length > 30){
            return string.slice(0,30)
        }
    }
    

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' +API_KEY+ '&language=en-US&page=1')
            .then(res => {
                setPopular(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' +API_KEY+ '&language=en-US&page=1')
            .then(res => {
                setUpcoming(res.data.results)   
            })
            .catch(err => console.log(err))

        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' +API_KEY+ '&language=en-US&page=1')
            .then(res => {
                setTopRated(res.data.results)   
            })
            .catch(err => console.log(err))

      
    }, [])



    return(
        <div>
            

            <form className="form-inline active-cyan-4" style={{display:'flex',justifyContent:'center',margin:"20px 0px 20px 0px"}}>
                <input className="form-control form-control-sm mr-3 w-50" type="text" placeholder="Search Movies"
                    aria-label="Search"/>
                <Button variant="primary"><i className="fas fa-search" aria-hidden="true" style={{color:'white'}}/></Button>
            </form>



            <section id="popular" style={{marginBottom:'5rem'}}>
                <div style={{margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                    <h1>Popular Movies</h1>
                    <div id="example-collapse-text">
                        {popular.slice(0,2).map((movie,i) =>(
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'200px',margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'200px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'200px'}}>Released: {movie.release_date}</h6>
                                    <h6 style={{width: '200px', fontWeight:'lighter', color:'grey', fontFamily:'Tahoma, Geneva, sans-serif'}}><span style={{color:'black', fontWeight:'strong'}}>Overview:</span>{movie.overview}</h6>
                                    <Link to='/movies/:id'><h6>More Info...</h6></Link> 
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* A button to view more popular movies */}
                    <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    >
                    View More
                    </Button>
                    <Collapse in={open}>    
                    <div id="example-collapse-text">
                        {popular.slice(2).map((movie,i) =>(
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'200px',margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'200px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'200px'}}>Released: {movie.release_date}</h6>
                                    <h6 style={{width: '200px', fontWeight:'lighter', color:'grey', fontFamily:'Tahoma, Geneva, sans-serif'}}><span style={{color:'black', fontWeight:'strong'}}>Overview:</span>{movie.overview}</h6>
                                    <Link to='/movies/:id'><h6>More Info...</h6></Link> 
                                </div>
                            </div>
                        ))}
                    </div>
                    </Collapse>
                </div>
            </section>
            


            <section id="upcoming" style={{marginBottom:'5rem'}}>
                <div style={{margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                    <h1>Upcoming Movies</h1>
                    <div id="example-collapse-text">
                        {upcoming.slice(0,2).map((movie,i) =>(
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'200px',margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'200px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'200px'}}>Released: {movie.release_date}</h6>
                                    <h6 style={{width: '200px', fontWeight:'lighter', color:'grey', fontFamily:'Tahoma, Geneva, sans-serif'}}><span style={{color:'black', fontWeight:'strong'}}>Overview:</span>{movie.overview}</h6>
                                    <Link to='/movies/:id'><h6>More Info...</h6></Link> 
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* A button to view more movies */}
                    <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    >
                    View More
                    </Button>
                    <Collapse in={open}>    
                    <div id="example-collapse-text">
                        {popular.slice(2).map((movie,i) =>(
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'200px',margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'200px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'200px'}}>Released: {movie.release_date}</h6>
                                    <h6 style={{width: '200px', fontWeight:'lighter', color:'grey', fontFamily:'Tahoma, Geneva, sans-serif'}}><span style={{color:'black', fontWeight:'strong'}}>Overview:</span>{movie.overview}</h6>
                                    <Link to='/movies/:id'><h6>More Info...</h6></Link> 
                                </div>
                            </div>
                        ))}
                    </div>
                    </Collapse>
                </div>
            </section>
        

            <hr className="half-rule" style={{height:'10px'}}/>
            

            <section id="toprated" style={{marginBottom:'5rem'}}>
                <div style={{margin:'0 auto', textAlign:'center', fontFamily:'Impact, Charcoal, sans-serif'}}>
                    <h1>Top Rated Movies</h1>
                    <div id="example-collapse-text">
                        {topRated.slice(0,2).map((movie,i) =>(
                            
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'250px', margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'250px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'250px'}}>Released: {movie.release_date}</h6>
                                    <hr className="half-rule"/>
                                    <p style={{width: '250px', fontWeight:'lighter', fontSize:'15px', fontFamily:'system-ui', textAlign:'left', lineHeight:'1.5'}}>
                                        <span style={{color:'black', border:'solid black 1px', fontWeight:'stronger'}}>Overview: </span>
                                        {movie.overview.slice(0,250)} ...<Link to='/movies/:id'>More</Link> 
                                    </p>
                                    
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* A button to view more movies */}
                    <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    >
                    View More
                    </Button>
                    <Collapse in={open}>    
                    <div id="example-collapse-text">
                        {topRated.slice(2).map((movie,i) =>(
                            <div key={i} style={{display:'inline-block'}}>
                                <div style={{width: '300px', margin:'10px', display:'inline-block'}}>
                                    <Link to='/movies/:id'>
                                        <img
                                        className="d-block w-100"
                                        src={"http://image.tmdb.org/t/p/w780" + movie.poster_path}
                                        alt=""/>
                                    </Link>
                                </div>
                                <div style={{width:'200px',margin:'10px', display:'inline-block', verticalAlign:'top'}}>
                                    <h1>
                                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {movie.vote_average}
                                    </h1>
                                   
                                    <h4 style={{width:'200px', color: 'rgba(0, 0, 0, 0.6)'}}>{movie.title}</h4>
                                    <h4></h4>
                                    <h6 style={{width:'200px'}}>Released: {movie.release_date}</h6>
                                    <h6 style={{width: '200px', fontWeight:'lighter', color:'grey', fontFamily:'Tahoma, Geneva, sans-serif'}}><span style={{color:'black', fontWeight:'strong'}}>Overview:</span>{movie.overview}</h6>
                                    <Link to='/movies/:id'><h6>More Info...</h6></Link> 
                                </div>
                            </div>
                        ))}
                    </div>
                    </Collapse>
                </div>
            </section>







               

        </div>
    )
}
export default Search


