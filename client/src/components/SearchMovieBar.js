import React, { useState } from 'react'
import { navigate } from '@reach/router';

import { Row, Col, Form } from 'react-bootstrap';


const SearchMovieBar = (props) => {
    const [search, setSearch] = useState("")

    const changeHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchMovie = (e) => {
        if(e.charCode===13){
            navigate(`/searchmovies/${search}`)
            setSearch("")
        } 
    }

    return(
        <Row onKeyPress={searchMovie}>
            <Col>
                <Form.Control type="text" onChange={changeHandler} value={search} placeholder="Search movies.." />
            </Col>
        </Row>
    )
}
export default SearchMovieBar