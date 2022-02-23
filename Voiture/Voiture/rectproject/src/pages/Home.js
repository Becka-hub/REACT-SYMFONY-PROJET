import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Cards from '../components/Cards';
import axios from 'axios';
const Home = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('http://127.0.0.1:8000/full/car').then(function (response) {
      setData(response.data.data)
      console.log("donner car",response.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
      <Container>
        <h1 className="text-center mt-3">PRODUITS VOITURES</h1>
        <div className="row mt-2">
          {data.map((donner) => (
            <div key={donner.id} className="col-12 col-sm-6 col-md-3 col-lg-3 m-3">
              <Cards
              id={donner.id} 
              name={donner.name}
              mark={donner.mark}
              number={donner.number}
              image={donner.image}
              comments={donner.comments}
              user={props.user}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Home;
