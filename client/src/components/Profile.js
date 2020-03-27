import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Profile = (props) => {
    const { currentUser, setCurrentUser, recentlyViewed } = props

    return (
        <Container className="bg-light py-3 mt-5">
            <h2>Hi!</h2>
            <Row className="my-5">
                <Col>
                    <h3>Recently Viewed</h3>
                    <div className="mb-3">
                        {recentlyViewed.map((item, i) => {
                            if(i <= 12) {
                                return <img key={i} src={"http://image.tmdb.org/t/p/w92/"+ item.poster_path} className="mr-3 mb-3" />
                            }
}                       )}
                    </div>
                    <h3>My Favorites</h3>
                    <div className="mb-5">
                        list of movies...
                    </div>
                    <h3>My Watchlist</h3>
                    <div className="mb-5">
                        list of movies...
                        {/* You haven't added any favorite movies. */}
                    </div>
                    <h3>My Reviews</h3>
                    <div className="mb-5">
                        list of reviews...
                    </div>
                </Col>
                <Col sm={4}>
                    <h4>My Friend List</h4>
                    <div>
                        list of friends...
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Profile