import React, { useState } from 'react'
import { Inscription } from '../Api/AuthRequest';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';


const Register = () => {
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [adresse, setAdresse] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    
    const handleClickPhoto = (e) => {
        var reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                var Base64 = reader.result;
                console.log(Base64);
                setPhoto(Base64);
            };
            reader.onerror = (error) => {
                console.log('Error', error);
            };
        }
    }

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { nom: nom, prenom: prenom, adresse: adresse, email: email, password: password, image: photo }
        Inscription(data).then(function (response) {
            if (response.data.title == "success") {
                toast.success(response.data.message);
                history.push("/login");
            }
        })
            .catch(function (error) {
                console.log(error.response);
                toast.warning(error.response.data.message);
            }).finally(function () {
                setNom("");
                setPrenom("");
                setAdresse("");
                setEmail("");
                setPhoto("");
                setPassword("");
                setLoading(false);
            });
    }


    return (
        <>
            <div className="py-5">
                <h1 className="text-center my-5 text-uppercase">Inscriptions</h1>
                <div className="d-flex justify-content-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center">
                            <img src={photo} width="100px" className="rounded" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Nom</label>
                                <input type="text" value={nom} className="form-control" required onChange={(e) => setNom(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer nom" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputEmail1">Prenom</label>
                                <input type="text" value={prenom} className="form-control my-2" required onChange={(e) => setPrenom(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer prenom" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputEmail1">Adresse</label>
                                <input type="text" value={adresse} className="form-control my-2" required onChange={(e) => setAdresse(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer adresse" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputEmail1">Adresse email</label>
                                <input type="email" value={email} className="form-control my-2" required onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer email" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputEmail1">Photo</label>
                                <input type="file" className="form-control my-2" required onChange={handleClickPhoto} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer photo" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputPassword1">Mot de passe</label>
                                <input type="password" value={password} className="form-control my-2" required onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Entrer password" />
                            </div>
                            <div className="d-flex justify-content-center my-3">
                                <button type="submit" className="btn btn-dark">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {loading && <Loader />}

        </>
    )
}

export default Register
