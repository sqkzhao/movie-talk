import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MovieDetailsReview = (props) => {
    const API_KEY = "fe849d6987c0000e3dc1352ccf5118fd"
    const { id } = props
    const [reviews, setReviews] = useState([])
    const [readMoreLess, setReadMoreLess] = useState("Read More")

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/" +id+ "/reviews?api_key=" +API_KEY+ "&language=en-US&page=1")
            .then(res => {
                setReviews(res.data.results)
                console.log(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])

    const moreLessHandler = (e) => {
        if(readMoreLess === "Read More") {
            setReadMoreLess("Collapse")
        } else {
            setReadMoreLess("Read More")
        }
    }

    return (
        <div className="container-sm px-5 pt-3 pb-5">
            <h2 className="mb-3">Reviews</h2>

            <form className="form-group m-3">
                <textarea class="form-control mb-2" rows="4">

                </textarea>
                <input type="submit" value="Submit Review" className="btn btn-sm btn-warning col mb-5" /> 
            </form>

            <nav aria-label="Page navigation">
                <ul className="pagination mx-auto col-2">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a class="page-link" href="#">1</a></li>
                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>


            {reviews.map((review, i) => {
                const last_space_index = review.content.substring(0, 451).lastIndexOf(" ")
                return (
                    <div key={i} className="card m-3">
                        <div className="card-body">
                            <p>
                                {review.content.substring(0, last_space_index)}
                                <span className="collapse" id={"collapse"+i}>
                                    {review.content.slice(last_space_index)}    
                                </span>
                                <span onClick={moreLessHandler} class="badge badge-warning ml-2" data-toggle="collapse" data-target={"#collapse"+i} aria-expanded="false">
                                    {readMoreLess}
                                </span>
                            </p>
                            <p className="font-italic font-weight-bold">Written by {review.author}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
export default MovieDetailsReview