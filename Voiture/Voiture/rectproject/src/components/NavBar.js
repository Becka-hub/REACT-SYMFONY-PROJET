import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
const NavBar = (props) => {

    let history = useHistory();
    const logout = () => {
        props.setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push("/login");
    }
    return (
        <div className="App">
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>GO Voiture {props.user?.nom}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse>
                        <Nav className="ms-auto text-center my-2 my-lg-0">
                            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                            {props.user &&
                                <>
                                    <Nav.Link as={Link} to={"/admin"}>Admin</Nav.Link>
                                </>
                            }
                            {!props.user &&
                                <>
                                    <Button as={Link} to={"/login"} variant="light">Login</Button>
                                    <Button as={Link} to={"/register"} className="mx-2" variant="dark">Register</Button>
                                </>
                            }
                            {props.user &&
                                <Button onClick={logout} className="mx-2" variant="danger">Logout</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}
export default NavBar;