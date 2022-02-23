import React from 'react'
import { useSelector } from 'react-redux'
const Payement = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const totalPrice = cart?.reduce((price, item) => price + item.qty * item.price, 0);
    return (
        <div className="py-5 container">
            <h1 className="text-center my-5">Payements</h1>
            <div className="row">
                {localStorage.getItem('token') &&
                        <div className="col-md-4 p-2" key={user.id}>
                            <div className="card">
                                <img src={'http://127.0.0.1:8000/imageUser/' + user.image} className="card-img-top" height="300px" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-center">{user.nom} {user.prenom}</h5>
                                    <p className="card-text text-center">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    }
                <div className="col-md-6 p-2">
                {cart.map((panier) => {
                    return (
                        <div className="row my-2" key={panier.id}>
                            <div className="col-md-6">
                                <img src={'http://127.0.0.1:8000/uploads/' + panier.image} width="120px" height="100px" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="content">
                                    <div className="card-body">
                                        <h5 className="mt-0 mb-1">{panier.libelle}</h5>
                                        <p>$ {panier.price}</p>
                                        <span className="lead">{panier.qty} X $ {panier.price} = $ {panier.qty * panier.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            <h2 className="text-center my-5">Total Prix $ {totalPrice}</h2>
        </div>
    )
}

export default Payement
