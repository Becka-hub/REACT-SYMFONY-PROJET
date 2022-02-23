import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { suprimerUser } from '../redux/action/actionAuth';
const Navbar = () => {
    const state = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(suprimerUser());
        history.push("/");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink to='/' className="navbar-brand fw-bold fs-4" href="#">LA COLLECTION</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link active" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/produit' className="nav-link" >Produits</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className="nav-link" >About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contact' className="nav-link" >Contact</NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                            <NavLink to='/cart' href="#" className="btn btn-outline-dark ms-2"><i className="fa fa-shopping-cart"></i> ({state?.length})</NavLink>
                            {token && <NavLink to='/payement'><img src={'http://127.0.0.1:8000/imageUser/' + user.image} className="rounded-circle ms-2" width="40px" height="40px" /></NavLink>}
                            {!token && <NavLink to='/login' href="#" className="btn btn-outline-dark ms-2"><i className="fa fa-sign-in"></i> Login</NavLink>}
                            {token && <button onClick={logout} className="btn btn-outline-dark ms-2"><i className="fa fa-power-off me-2"></i>Déconnexion</button>}
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar;
