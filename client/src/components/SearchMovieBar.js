import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { navigate } from '@reach/router';

const SearchMovieBar = (props) => {
    const [search, setSearch] = useState("")

    const changeHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchMovie = (e) => {
        if(e.charCode==13){
            navigate('/searchmovies/' + search)
            setSearch("")
        } 
    }

    return(
        <Row onKeyPress={searchMovie}>
            <Col>
                <Form.Control type="text" onChange={changeHandler} value={search} placeholder="Search movies.." rounded-0 />
            </Col>
        </Row>
    )
}
export default SearchMovieBar