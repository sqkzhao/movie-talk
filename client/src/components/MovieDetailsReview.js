import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PageNavigation from './PageNavigation';

const MovieDetailsReview = (props) => {
    const { id, currentUser } = props
    const [post, setPost] = useState("")
    const [reviews, setReviews] = useState([])
    const [readMoreLess, setReadMoreLess] = useState("Read More")   // collapse
    const [pages, setPages] = useState(0);
    const [goToPage, setGoToPage] = useState(1);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${goToPage}`)
            .then(res => {
                setReviews(res.data.results)
                setPages(res.data.total_pages);
            })
            .catch(err => console.log(err))
    }, [goToPage, id])

    const moreLessHandler = (e) => {
        if(readMoreLess === "Read More") {
            setReadMoreLess("Collapse")
        } else {
            setReadMoreLess("Read More")
        }
    }

    const submitReview = (e) => {
        e.preventDefault()
        const postObj = {
            movieid: id,
            review: post
        }
        const tempReview = currentUser.reviews.push(postObj);
        axios.put(`http://localhost:8000/users/${currentUser._id}`, {
            ...currentUser, 
            reviews: tempReview
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="container-sm px-5 pt-3 pb-5">
            <h2 className="mb-3">Reviews</h2>

            <form className="form-group m-3" onSubmit={submitReview} >
                <textarea className="form-control mb-2" rows="4" onChange={(e) => setPost(e.target.value)}>
                </textarea>
                <input type="submit" value="Submit Review" className="btn btn-sm btn-warning col mb-5" /> 
            </form>

            {reviews.map((review, i) => {
                const last_space_index = review.content.substring(0, 451).lastIndexOf(" ");
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

            {pages > 1 ? <PageNavigation pages={pages} goToPage={goToPage} setGoToPage={setGoToPage} /> : null}

        </div>
    )
}
export default MovieDetailsReview