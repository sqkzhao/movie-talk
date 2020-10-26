import React from 'react';

const About = () => {
    return(
        <div className="jumbotron jumbotron-fluid bg-light text-secondary mb-0 mt-5 py-5">
            <div className="container">
                <h4>About</h4>
                <div className="row">
                    <ul className="lead col-10" style={{listStyleType: "none"}}>
                        <li>A full-stack MERN web project</li>
                        <li className="h6">Github: <a href="https://github.com/sqkzhao/movie-talk" rel="noopener noreferrer" target="_blank" className="text-secondary">Here</a></li>
                    </ul>
                    <div className="col-2">
                        <h6 className="pl-3">Data source:</h6>
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDb" className="col-10"></img>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default About;