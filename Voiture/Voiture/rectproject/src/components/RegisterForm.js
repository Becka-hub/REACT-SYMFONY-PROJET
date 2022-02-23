import React, { useState } from 'react';
import axios from 'axios';
import imgloading from '../images/loading.gif';
import { useHistory, } from "react-router-dom";
const RegisterForm = () => {

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({
    'title': '',
    'msg': ''
  });
  const [nomError, setNomError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState('');
  let history = useHistory();
  const handleNomChange = (e) => {
    setMessage({
      'title': '',
      'msg': ''
    });
    setNom(e.target.value);
    setNomError('');
  }

  const handleEmailChange = (e) => {
    setMessage({
      'title': '',
      'msg': ''
    });
    setEmailError('');
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setMessage({
      'title': '',
      'msg': ''
    });
    setPassword(e.target.value);
    setPasswordError('');
  }

  console.log(message);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (nom !== "") {
      setNomError('');
      if (email !== "") {
        setEmailError('');
        if (password !== "") {
          setPasswordError('');
          setLoading(true);
          axios.post('http://127.0.0.1:8000/auth/register', {
            nom: nom,
            email: email,
            password: password
          }).then(function (response) {
            setMessage({
              'title': response.data.title,
              'msg': response.data.message
            });
            if (response.data.title == "Success") {
              history.push("/login");
            }
          })
            .catch(function (error) {
              setMessage({
                'title': error.response.data.title,
                'msg': error.response.data.message
              });
            }).finally(function () {
              setEmail('');
              setNom('');
              setPassword('');
              setLoading(false);
            });
        } else {
          setPasswordError('Entrer votre password');
        }
      } else {
        setEmailError('Entrer votre adresse mail')
      }
    } else {
      setNomError('Entrer votre nom');
    }
  }
  return (
    <div>
      <h3 className="text-center">Créer Votre compte</h3>
      <div className="d-flex justify-content-center ">
        <div className="col-md-4">
          {message && message.title == "Success" ? <div className="alert alert-success" role="alert">
            {message.msg}
          </div> : message && message.title == "Error" ? <div className="alert alert-danger" role="alert">
            {message.msg}
          </div> : null}
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <form className="form-group form" autoComplete="off" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input type="text" className="form-control" onChange={handleNomChange} value={nom} placeholder="Entrer votre nom..." />
                {nomError && <div class="alert alert-danger" role="alert">
                  {nomError}
                </div>}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">Adresse mail</label>
                <input type="email" className="form-control" onChange={handleEmailChange} value={email} placeholder="Entrer votre email..." />
                {emailError && <div class="alert alert-danger" role="alert">
                  {emailError}
                </div>}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-control" onChange={handlePasswordChange} value={password} placeholder="Entrer votre mot de passe..." />
                {passwordError && <div class="alert alert-danger" role="alert">
                  {passwordError}
                </div>}
              </div>

              {loading && <img src={imgloading} />}
              <div className="form-group d-flex justify-content-center mt-2">
                <button className="btn btn-success btn-sm">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
