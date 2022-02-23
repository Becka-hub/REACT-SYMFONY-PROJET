import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { GetProduit } from '../Api/ProduitRequest';
import { Produits } from '../redux/action/actionProduit';
import { useDispatch } from 'react-redux';
const Produit = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    useEffect(() => {
        getProduits();
    }, []);

    const getProduits = () => {
        setLoading(true);
        GetProduit().then(function (response) {
            setData(response.data.Donner);
            setFilter(response.data.Donner);
            setLoading(false);
            console.log(filter);
            dispatch(Produits(response.data.Donner));
            localStorage.setItem('produit', JSON.stringify(response.data.Donner));
        }).catch(function (error) {
            console.log(error);
        });
    }




    const Loading = () => {
        return (
            <>
                <SkeletonTheme baseColor="#E6E6E6" highlightColor="#fff">
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={200} />
                    </div>
                </SkeletonTheme>
            </>
        );
    }




    const handleFilter = (object) => {
        if (object === "All") {
            setFilter(data);
        } else {
            let donner = data.filter((produit) => produit.libelle === object);
            setFilter(donner);
        }
    }




    const ShowProduit = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-3 pb-3">
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("All")}>All</div>
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("Destination")}>Destination</div>
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("Chaussure")}>Chaussure</div>
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("Fleur")}>Fleur</div>
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("Hotels")}>Hotels</div>
                    <div className="btn btn-outline-dark me-2" onClick={() => handleFilter("Montres")}>Montres</div>
                </div>
                <div className="row">

                    {filter?.map((product) => {
                        return (
                            <div className="col-md-3 my-2" key={product.id}>
                                <div className="card card-produit h-100 text-center p-4">
                                    <img src={'http://127.0.0.1:8000/uploads/' + product.image} className="card-img-top h-75" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.libelle}</h5>
                                        {/* <p className="card-text lead fw-bold">{product.content.substring(0,35)}</p> */}
                                        <p className="card-text lead fw-bold">$ {product.price}</p>
                                        <Link to={`/details/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </>
        )
    }




    return (
        <div>
            <div className="container my-5 py-3">
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-6 fw-bolder text-center my-4">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProduit />}
                </div>
            </div>
        </div>
    )
}

export default Produit;
