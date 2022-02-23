import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteCart, addCart } from '../redux/action/actionCart';
import { Link } from 'react-router-dom';
const Cart = () => {
    const state = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(state);

    const totalPrice = state?.reduce((price, item) => price + item.qty * item.price, 0);

    const handleDelete = (produit) => {
        dispatch(DeleteCart(produit));
    }

    const handleAdd = (produit) => {
        dispatch(addCart(produit));
    }

    const Vide = () => {
        return (
            <h2 className="text-center my-5">Panier Vide ...</h2>
        );
    }


    const ContentPanier = () => {
        return (
            <div className="container my-5">
                {state.map((panier) => {
                    return (
                        <div className="row my-2" key={panier.id}>
                            <div className="col-md-6">
                                <img src={'http://127.0.0.1:8000/uploads/' + panier.image} width="300px" height="200px" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="content">
                                    <div className="card-body">
                                        <h5 className="mt-0 mb-1">{panier.libelle}</h5>
                                        <p>$ {panier.price}</p>
                                        <span className="lead">{panier.qty} X $ {panier.price} = $ {panier.qty * panier.price}</span>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <button className="btn btn-outline-dark" onClick={() => handleDelete(panier)} ><i className="fa fa-minus"></i></button>
                                        <button className="btn btn-outline-dark" onClick={() => handleAdd(panier)}><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}

                <div className="card-footer d-flex justify-content-center my-4">
                    <Link to="/login" className="btn btn-outline-dark">Proceed to Checkout</Link>
                </div>
            </div>
        );
    }


    return (
        <div className="py-5">
            <h1 className="text-center my-5">Votre panier Total Prix $ {totalPrice}</h1>
            {state?.length > 0 ? <ContentPanier /> : <Vide />}
        </div>

    )


}

export default Cart;
