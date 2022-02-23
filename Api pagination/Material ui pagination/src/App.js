import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CssBaseline } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    getData();
  }, [page])

  const getData = async (value = 0) => {
    let dvalue = value === 0 ? page : value;
    await axios.get(`http://127.0.0.1:8000/afficheProduit/${dvalue}`).then(function (response) {
      setData(response.data.Donner);
      setTotalPage(response.data.totalPage);
      console.log("donner produit", response.data.Donner);
    }).catch(function (error) {
      console.log(error);
    });
  }
  const handlePage = (event, value) => {
    setPage(value);
    getData(value);
  }
  return (
    <div className="container">
      <h1 className="text-center my-2 text-danger">Api pagination Material ui {page}</h1>
      <div className="row d-flex justify-content-center my-5">
        {data.map((produit) => {
          return (
            <div className="col-sm-3" key={produit.id}>
              <div className="card shadow-sm p-2 me-1">
                <img src={'http://127.0.0.1:8000/uploads/' + produit.image} className="card-img-top" height="200px" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">{produit.libelle}</h5>
                  <p className="card-text text-center">$ {produit.price}</p>
                  <div className="d-flex justify-content-center">
                    <a href="#" className="btn btn-danger btn-sm">Détails</a>
                  </div>
                </div>
              </div>

            </div>
          );
        })}

      </div>
      <div className="d-flex justify-content-center">
        <CssBaseline />
        {/* <Pagination 
          count={10} 
          color="primary" 
          variant="outlined" 
          size="large"  
          shape="rounded"/> 
          defaultPage={3}
          showLastButton={true}
          showFirstButton={true}
          hideNextButton={true}
          hidePrevButton={true}
          */}
        <Pagination
          count={totalPage}
          color="secondary"
          onChange={handlePage}
        />
      </div>
    </div>
  );
}

export default App;
