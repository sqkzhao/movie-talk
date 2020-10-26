import React from 'react';
import axios from 'axios';
import { Link, Router, navigate } from '@reach/router';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = (props) => {
    const { currentUserId, setCurrentUser, setCurrentUserId, setRecentlyViewed } = props;

    const logoutHandler = (e) => {
        e.preventDefault()
        setCurrentUser(null)
        setCurrentUserId("")
        navigate('/')
        axios.get('http://localhost:8000/logout')
            .then(res => {
                setRecentlyViewed([])
            })
            .catch(err => console.log(err))
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
        <Navbar.Brand><Link to="/"><span className="text-white"><i className="fas fa-film"></i><strong> MOVIE TALK!</strong></span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link><Link to="/"><span className="text-light">Home</span></Link></Nav.Link>
                <NavDropdown title="Movies" id="collasible-nav-dropdown" >
                <NavDropdown.Item><Link to='/searchmovies#popular'>Popular</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/searchmovies#upcoming'>Upcoming</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/searchmovies#toprated'>Top Rated</Link></NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                {currentUserId!="" ? 
                <>
                    <Nav.Link><Link to="/profile"><i className="far fa-user-circle text-white h4"></i></Link></Nav.Link>
                    <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </> :
                <>
                    <Nav.Link><Link to="/sign_up"><span className="text-light">Sign Up</span></Link></Nav.Link>
                    <Nav.Link><Link to="/sign_in"><span className="text-light">Sign In</span></Link></Nav.Link>
                </>}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavbarComponent;