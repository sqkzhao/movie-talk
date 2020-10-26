import React from 'react';
import { Pagination } from 'react-bootstrap'

const PageNavigation = (props) => {
    const { pages, goToPage, setGoToPage } = props;

    const prevPageHandler = (e) => {
        setGoToPage(goToPage-1);
    }
    const nextPageHandler = (e) => {
        setGoToPage(goToPage+1);
    }

    return (
        <Pagination className="mx-auto col-2 pb-5">

            {goToPage-1 > 0 ?
            <Pagination.Item onClick={prevPageHandler}>Prev</Pagination.Item> : 
            <Pagination.Item onClick={prevPageHandler} disabled>Prev</Pagination.Item>}
            {goToPage-1 > 0 ?
            <Pagination.Item onClick={prevPageHandler}>{goToPage-1}</Pagination.Item> : 
            <Pagination.Item onClick={prevPageHandler} disabled>&laquo;</Pagination.Item>}

            <Pagination.Item active>{goToPage}</Pagination.Item>

            {goToPage+1 <= pages ? <>
            <Pagination.Item onClick={nextPageHandler}>{goToPage+1}</Pagination.Item> 
            <Pagination.Item onClick={nextPageHandler}>Next</Pagination.Item>
            </> : <>
            <Pagination.Item onClick={nextPageHandler} disabled>&raquo;</Pagination.Item>
            <Pagination.Item onClick={nextPageHandler} disabled>Next</Pagination.Item> </>}

        </Pagination>
    )
}
export default PageNavigation;