import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import VoitureForm from '../components/VoitureForm';
import VoitureFormUpdate from '../components/VoitureFormUpdate';
import axios from 'axios';
const Admin = (props) => {

  const [updateData, setUpdateDate] = useState(
    {
      'data': [],
    }
  );

  const [data, setData] = useState([]);
  const [supression, setSuppression] = useState({
    'title': '',
    'msg': ''
  });

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('http://127.0.0.1:8000/api/car/carList', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(function (response) {
        setData(response.data.data)
      }).catch(function (error) {
        console.log(error);
      });
  }

  const onDeleteClick = (id) => {
    axios.delete('http://127.0.0.1:8000/api/car/carDelete/' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(function (response) {
        getData();
        setSuppression({
          'title': response.data.title,
          'msg': response.data.message
        });
        setTimeout(() => {
          setSuppression({
            'title': '',
            'msg': ''
          });
        }, 3000);
      }).catch(function (error) {
        setSuppression({
          'title': error.response.data.title,
          'msg': error.response.data.message
        });
        setTimeout(() => {
          setSuppression({
            'title': '',
            'msg': ''
          });
        }, 3000);
      });
  }

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);

  const onUpdateClick = (id) => {
    const oneData = data.filter(data =>
      data.id == id
    );
    setUpdateDate({
      'data': oneData
    });
    console.log(updateData.data)
    setShowUpdate(true);
  }

  const [showAjoute, setShowAjoute] = useState(false);
  const handleCloseAjoute = () => setShowAjoute(false);
  const handleShowAjoute = () => setShowAjoute(true);


  return (
    <div>
      <div className="container mt-2">
        <h3 className="text-center mt-5 mb-2">Liste voitures {props.user?.nom}</h3>
        <div className="d-flex justify-content-center">
          <div className="col-md-4">
            {
              supression && supression.title == "Success" ?
                <h3 className="text-center mt-5 mb-2">
                  <div className="alert alert-success" role="alert">
                    {supression.msg}
                  </div>
                </h3>
                : supression && supression.title == "Error" ?
                  <h3 className="text-center mt-5 mb-2">
                    <div className="alert alert-danger" role="alert">
                      {supression.msg}
                    </div>
                  </h3>
                  : null
            }
          </div>
        </div>
        <div className="buttonAjouter mb-3 mt-2">
          <Button variant="primary" onClick={handleShowAjoute}>
            Ajoute voiture
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Mark</th>
              <th>Number</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td><img src={'http://127.0.0.1:8000/uploads/car/' + data.image} width="60px" /></td>
                <td>{data.name}</td>
                <td>{data.mark}</td>
                <td>{data.number}</td>
                <td><button className="btn btn-info btn-sm" onClick={onUpdateClick.bind(this, data.id)}>Update</button></td>
                <td><button className="btn btn-danger btn-sm" onClick={onDeleteClick.bind(this, data.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </Table>


        <div className="ajouter_modal">
          <Modal show={showAjoute} onHide={handleCloseAjoute}>
            <Modal.Header>
              <Modal.Title>AJOUTE VOITURE</Modal.Title>
              <Button variant="danger" onClick={handleCloseAjoute}>
                X
              </Button>
            </Modal.Header>
            <Modal.Body>
              <VoitureForm setData={setData} />
            </Modal.Body>
          </Modal>
        </div>


        <div className="update_modal">
          <Modal show={showUpdate} onHide={handleCloseUpdate}>
            <Modal.Header>
              <Modal.Title>Modifier VOITURE</Modal.Title>
              <Button variant="danger" onClick={handleCloseUpdate}>
                X
              </Button>
            </Modal.Header>
            <Modal.Body>{updateData.data.map((data) => (
              <VoitureFormUpdate
                key={data.id}
                id={data.id}
                name={data.name}
                mark={data.mark}
                number={data.number}
                image={data.image}
                getDatas={getData}
              />
            ))}</Modal.Body>
          </Modal>
        </div>


      </div>
    </div>
  );
}
export default Admin;
