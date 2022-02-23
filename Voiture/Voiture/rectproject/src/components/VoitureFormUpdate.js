import React, { useState } from 'react'
import imgloading from '../images/loading.gif';
import axios from 'axios';
const VoitureFormUpdate = (props) => {
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [mark, setMark] = useState(props.mark);
    const [number, setNumber] = useState(props.number);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState('');
    const [nameError, setNameError] = useState('');
    const [markError, setMarkError] = useState('');
    const [numberError, setNumberError] = useState('');

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
        setMessage({
            'title': '',
            'msg': '',
        });
        setImage(e.target.files[0]);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (name !== "") {
            if (mark !== "") {
                if (number !== "") {
                    const form = new FormData();
                    form.append('name', name);
                    form.append('number', number);
                    form.append('mark', mark);
                    form.append('image', image);
                    axios.post(
                        'http://127.0.0.1:8000/api/car/carUpdate/' + id,
                        form,
                        {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(function (response) {
                        console.log(response);
                        props.getDatas();
                        setMessage({
                            'title': response.data.title,
                            'msg': response.data.message
                        });
                    }).catch(function (error) {
                            console.log(error.response);
                            setMessage({
                                'title': error.response.data.title,
                                'msg': error.response.data.message
                            });
                        }).finally(function () {
                            setLoading(false);
                            setTimeout(() => {
                                setMessage({
                                    'title': '',
                                    'msg': ''
                                });
                            }, 2000)
                        });
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
export default VoitureFormUpdate;