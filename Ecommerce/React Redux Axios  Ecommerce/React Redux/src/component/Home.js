import React from 'react'
import Produit from './Produit';
const Home = () => {
    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0">
                <img src="images/bg.jpg" className="card-img" alt="background" height="600px" />
                <div className="card-img-overlay d-flex justify-content-center flex-column">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                        <p className="card-text fs-2">CHECK OUT ALL TRENDS</p>
                        <p className="card-text">Last updated 3 mins ago</p>
                    </div>
                </div>
            </div>
            <Produit/>
        </div>
    )
}

export default Home;
