import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Auth } from '../Api/AuthRequest';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { user } from '../redux/action/actionAuth';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handeSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email: email, password: password };
    Auth(data).then(function (response) {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.donner));
      localStorage.setItem('token', response.data.token);
      dispatch(user(response.data.donner));
      if (response.data.title === "success") {
        history.push("/payement");
      }
    }).catch(function (error) {
        console.log(error);
        if(error){
           toast.warning(error.response.data.message);
        }
        
      }).finally(function () {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="py-5">
        <h1 className="text-center my-5 text-uppercase">Connexion</h1>
        <div className="d-flex justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handeSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Adresse email</label>
                <input type="email" value={email} className="form-control my-2" onChange={(e) => setEmail(e.target.value)} required id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div className="form-group my-3">
                <label htmlFor="exampleInputPassword1">Mot de passe </label>
                <input type="password" value={password} className="form-control my-2" onChange={(e) => setPassword(e.target.value)} required id="exampleInputPassword1" placeholder="Password" />
              </div>
              <Link to="/register" className="my-2 text-decoration-none text-dark lead">Vous n'avez pas de compte? <span className=" text-info">Créer un compte</span></Link>
              <div className="d-flex justify-content-center my-3">
                <button type="submit" className="btn btn-dark">connexion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  )
}

export default Login
