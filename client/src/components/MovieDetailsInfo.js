import React, { useState, useEffect } from 'react'

const MovidDetailsInfo = (props) => {
    return (
        <div className="container-sm px-5 pt-3 pb-5">
            <h2>Details</h2>
            <div className="px-5 mt-3">
                <p><strong>Official site: </strong></p>
                <p><strong>Country: </strong></p>
                <p><strong>Language: </strong></p>
                <p><strong>Original title: </strong></p>
                <p><strong>Production companies: </strong></p>

                <p><strong>Budget: </strong></p>
                <p><strong>Revenue: </strong></p>
            </div>
            <h2>Cast</h2>
            <h2>Crew</h2>
        </div>
    )
}
export default MovidDetailsInfo