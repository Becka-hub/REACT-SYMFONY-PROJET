import React, { useState } from 'react';
import imgloading from '../images/loading.gif';
import axios from 'axios';
const VoitureForm = (props) => {
    const [name, setName] = useState('');
    const [mark, setMark] = useState('');
    const [number, setNumber] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState('');
    const [nameError, setNameError] = useState('');
    const [markError, setMarkError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [ImageError, setImageError] = useState('');
    const [message, setMessage] = useState({
        'title': '',
        'msg': '',
    });

    const handleNameChange = (e) => {
        setNameError('');
        setMessage({
            'title': '',
            'msg': '',
        });
        setName(e.target.value);
    }
    const handleMarkChange = (e) => {
        setMarkError('');
        setMessage({
            'title': '',
            'msg': '',
        });
        setMark(e.target.value);
    }
    const handleNumberChange = (e) => {
        setNumberError('');
        setMessage({
            'title': '',
            'msg': '',
        });
        setNumber(e.target.value);
    }
    const handleImageChange = (e) => {
        setImageError('');
        setMessage({
            'title': '',
            'msg': '',
        });
        setImage(e.target.files[0]);
    }

    const handleFormSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if (name !== "") {
            if (mark !== "") {
                if (number !== "") {
                    if (image !== "") {
                        const form = new FormData();
                        form.append('name', name);
                        form.append('number', number);
                        form.append('mark', mark);
                        form.append('image', image);
                        axios.post(
                            'http://127.0.0.1:8000/api/car/carSave',
                            form,
                            {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                        ).then(function (response) {
                            console.log(response);
                            props.setData(prev => [response.data.data, ...prev])
                            setMessage({
                              'title': response.data.title,
                              'msg': response.data.message
                            });
                        })
                            .catch(function (error) {
                                console.log(error.response);
                                  setMessage({
                                    'title': error.response.data.title,
                                    'msg': error.response.data.message
                                  });
                            }).finally(function () {
                                setLoading(false);
                                setName('');
                                setMark('');
                                setNumber('');
                                setImage(null);
                                setTimeout(()=>{
                                    setMessage({
                                        'title': '',
                                        'msg': ''
                                      });
                                },2000)
                            });
                    } else {
                        setImageError('Entrer image');
                    }
                } else {
                    setNameError("Entrer number");
                }
            } else {
                setMarkError("Entrer mark");
            }
        } else {
            setNameError('Entrer name');
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="col-md-4">
                    {message && message.title == "Error" ? <div className="alert alert-danger" role="alert">
                        {message.msg}
                    </div> : message && message.title == "Success" ? <div className="alert alert-success" role="alert">
                        {message.msg}
                    </div> : null}
                </div>
            </div>
            <form className="form-group form" autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={handleNameChange} value={name} placeholder="Entrer name..." />
                    {nameError && <div class="alert alert-danger" role="alert">
                        {nameError}
                    </div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Mark</label>
                    <input type="text" className="form-control" onChange={handleMarkChange} value={mark} placeholder="Entrer marque..." />
                    {markError && <div class="alert alert-danger" role="alert">
                        {markError}
                    </div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Number</label>
                    <input type="text" className="form-control" onChange={handleNumberChange} value={number} placeholder="Entrer marque..." />
                </div>
                {numberError && <div class="alert alert-danger" role="alert">
                    {numberError}
                </div>}
                <div className="form-group">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} placeholder="Entrer image..." />
                    {ImageError && <div class="alert alert-danger" role="alert">
                        {ImageError}
                    </div>}
                </div>
                <div className="d-flex justify-content-center mt-2 mb-2">
                {loading && <img src={imgloading} width="40px" />}
                </div>
                <div className="form-group d-flex justify-content-center mt-2">
                    <button className="btn btn-success btn-sm">Ajouter</button>
                </div>
            </form>
        </div>
    )
}
export default VoitureForm;