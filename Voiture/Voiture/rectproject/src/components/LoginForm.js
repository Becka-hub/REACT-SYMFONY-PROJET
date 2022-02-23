import React, { useState } from 'react';
import { useHistory, } from "react-router-dom";
import imgloading from '../images/loading.gif';
import axios from 'axios';
const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({
    'title': '',
    'msg': '',
    'data': '',
    'token': ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  let history = useHistory();
  const [loading, setLoading] = useState('');

  const handleEmailChange = (e) => {
    setMessage({
      'title': '',
      'msg': '',
      'data': '',
      'token': ''
    });
    setEmailError('');
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setMessage({
      'title': '',
      'msg': '',
      'data': '',
      'token': ''
    });
    setPassword(e.target.value);
    setPasswordError('');
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email !== '') {
      setEmailError('');
      if (password !== '') {
        setPasswordError('');
        setLoading(true);
        axios.post('http://127.0.0.1:8000/auth/login', {
          email: email,
          password: password
        }).then(function (response) {
          console.log(response);
          setMessage({
            'title': response.data.title,
            'msg': response.data.message,
            'data': response.data.data.data,
            'data': response.data.data.token,
          });
          localStorage.setItem('user', JSON.stringify(response.data.data.data));
          localStorage.setItem('token', response.data.data.token);
          props.setUser(response.data.data.data);
          if (response.data.title == "Success") {
            history.push("/admin");
          }
        })
          .catch(function (error) {
            console.log(error);
            setMessage({
              'title': error.response.data.title,
              'msg': error.response.data.message,
              'data': '',
              'data': '',
            });
          }).finally(function () {
            setLoading(false);
          });
      } else {
        setPasswordError('Entre votre mot de passe');
      }
    } else {
      setEmailError('Entre votre adresse email');
    }
  }
  return (
    <div>
      <h3 className="text-center mt-3">Login</h3>
      <div className="d-flex justify-content-center">
        <div className="col-md-4">
          {message && message.title == "Not found" || message && message.title == "Error" ? <div className="alert alert-danger" role="alert">
            {message.msg}
          </div> : null}</div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card p-3">
            <form className="form-group form" autoComplete="off" onSubmit={handleFormSubmit}>
              <div className="form-group">
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
              <div className="d-flex justify-content-center mt-2 mb-2">{loading && <img src={imgloading} width="40px" />}</div>
              <div className="form-group d-flex justify-content-center mt-2">
                <button className="btn btn-success btn-sm">Connexion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
