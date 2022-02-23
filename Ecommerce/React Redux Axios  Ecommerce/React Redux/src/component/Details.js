import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action/actionCart';
import { toast } from 'react-toastify';
import { GetProduitDetails } from '../Api/ProduitRequest';
const Details = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getProduit =  () => {
            setLoading(true);
            GetProduitDetails(id).then(function (response) {
                    setProduit(response.data.Donner);
                    setLoading(false);
                }).catch(function (error) {
                    console.log(error);
                });
        }
        getProduit();
    },[]);


    const dispatch = useDispatch();
    const dataPanier = useSelector((state) => state.cart);

    const addProduct = (produit) => {

        const existe = dataPanier.find((panier) => panier.id === produit.id);
        if (existe) {
            toast.warning("Produit existe déjas dans le panier");
        } else {
            dispatch(addCart(produit));
            toast.success("Produit ajoutée au panier");
        }
    }


    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ LineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
                </div>
            </>
        );
    }

    const ShowProduit = () => {
        return (
            <>
                <div className="col-md-6 my-5">
                    <img src={'http://127.0.0.1:8000/uploads/' + produit.image} width="400px" />
                </div>
                <div className="col-md-6 my-5">
                    <h1 className="text-uppercase fw-bolder display-5">{produit.libelle}</h1>
                    <hr />
                    <p className="lead fw-bolder">Rating $ {produit.price}<i className="fa fa-start"></i></p>
                    <h3 className="fw-bold text-black-50 display-6 my-4">{produit.content}</h3>
                    <button className="btn btn-outline-dark" onClick={() => addProduct(produit)}><i className="fa fa-plus"></i> Add to Cart</button>
                    <NavLink to='/cart' className="btn btn-dark ms-2">Go to Cart</NavLink>
                </div>

            </>
        );
    }
    return (
        <div>
            <div className="container my-5">
                <div className="row py-5">
                    {loading ? <Loading /> : <ShowProduit />}
                </div>
            </div>
        </div>
    )
}

export default Details;
